import React, { useEffect, useRef } from "react";
import "./WordCloud.css";
import { renderWordCloud } from "../utils/wordCloudGenerator";

const WordCloud = ({ data, hasData, size }) => {
  const wordCloudRef = useRef(null); // 캔버스를 렌더링할 참조 설정

  useEffect(() => {
    console.log("WordCloud Data:", data);
    if (hasData && data && wordCloudRef.current) {
      renderWordCloud(data, wordCloudRef.current);
    }
  }, [data, hasData]);

  if (!hasData || !data || data.length === 0) {
    return (
      <div
        className={`wordcloud-container no-data ${
          size === "large" ? "large" : ""
        }`}
      >
        <p className="no-data-text">WordCloud</p>
      </div>
    );
  }

  return (
    <div className="wordcloud-wrapper">
      <div
        className={`wordcloud-container ${size === "large" ? "large" : ""}`}
        ref={wordCloudRef}
      >
        {/* WordCloud가 이 div에 렌더링됩니다 */}
        <div className="wordcloud-contents">
          <canvas id="wordCloudCanvas"></canvas>
        </div>
      </div>
    </div>
  );
};

export default WordCloud;
