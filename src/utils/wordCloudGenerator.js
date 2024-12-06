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

  const options = {
    list: entries.map(({ text, size }) => [text, size]),
    gridSize: 6, // 더 촘촘하게 배치
    weightFactor: (size) => size, // 크기 조정 (단어의 빈도에 따라 크기 비례)
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
    drawOutOfBound: false, // 경계를 넘어가지 않도록
    minRotation: 0,
    maxRotation: 0,
    shape: "square",
  };

  // 워드클라우드를 HTML 엘리먼트에 렌더링
  const element = document.getElementById(elementId);
  if (element) {
    WordCloud(element, options);
  }
};
