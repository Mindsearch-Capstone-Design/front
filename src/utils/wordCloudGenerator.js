import * as d3 from "d3";
import WordCloud from "wordcloud";

export const generateWordCloudData = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/comments.csv`
    );
    if (!response.ok) {
      throw new Error("Failed to load CSV file");
    }

    const text = await response.text();
    const rows = text
      .split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(","));

    // 감정별 댓글 분류
    const positiveComments = [];
    const neutralComments = [];
    const negativeComments = [];

    rows.slice(1).forEach((row, index) => {
      if (row.length < 4) {
        console.warn(`Skipping invalid row ${index + 1}:`, row);
        return;
      }
      const content = row[1].trim(); // 댓글 내용
      const sentiment = row[3].trim(); // 감정 값 (0, 1, 2)

      if (sentiment === "0") {
        positiveComments.push(content);
      } else if (sentiment === "1") {
        neutralComments.push(content);
      } else if (sentiment === "2") {
        negativeComments.push(content);
      }
    });

    return {
      긍정: positiveComments.join(" "),
      중립: neutralComments.join(" "),
      부정: negativeComments.join(" "),
    };
  } catch (error) {
    console.error("Error loading CSV data:", error);
    return {
      긍정: "",
      중립: "",
      부정: "",
    };
  }
};

// 워드클라우드를 생성하여 지정된 HTML 엘리먼트에 렌더링
export const renderWordCloud = (text, elementId) => {
  const wordCounts = d3.rollup(
    text.split(/\s+/),
    (v) => v.length,
    (word) => word
  );

  const entries = Array.from(wordCounts).map(([word, count]) => ({
    text: word,
    size: count * 10, // 단어의 크기는 빈도에 비례
  }));

  const element = document.getElementById(elementId);
  if (element) {
    // 고해상도 처리를 위해 실제 크기를 확대
    const canvas = document.createElement("canvas");
    const ratio = Math.min(window.devicePixelRatio || 1, 2); // 비율을 적절히 제한

    // 컨테이너의 실제 크기와 비율을 반영한 캔버스 설정
    const width = element.offsetWidth * ratio;
    const height = element.offsetHeight * ratio;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${element.offsetWidth}px`;
    canvas.style.height = `${element.offsetHeight}px`;

    element.innerHTML = ""; // 이전 내용을 지움
    element.appendChild(canvas);

    const options = {
      list: entries.map(({ text, size }) => [text, size]),
      gridSize: Math.round(2 * (width / 1024)), // 가로 크기에 맞게 그리드 조정
      weightFactor: (size) => (width / 1024) * size, // 크기 비율 조정
      fontFamily: "Nanum Gothic",
      color: () => {
        const colors = [
          "#FF6F61",
          "#6B5B95",
          "#88B04B",
          "#F7CAC9",
          "#92A8D1",
          "#955251",
          "#B565A7",
          "#009B77",
          "#DD4124",
          "#45B8AC",
          "#EFC050",
          "#5B5EA6",
          "#9B2335",
          "#DFCFBE",
          "#55B4B0",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      },
      rotateRatio: 0, // 회전하지 않음, 가로로 길게 하기 위해 0으로 설정
      backgroundColor: "#ffffff",
      drawOutOfBound: false,
      minRotation: 0, // 회전 각도 최소값 (0도)
      maxRotation: 0, // 회전 각도 최대값 (0도)
      shape: "square", // 직사각형 형태로 만들기 위해 설정
    };

    // 워드클라우드 렌더링
    WordCloud(canvas, options);
  } else {
    console.error("Element not found:", elementId);
  }
};
