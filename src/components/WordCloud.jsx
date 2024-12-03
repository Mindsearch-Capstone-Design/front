import React from "react";
import "./WordCloud.css";
import PositiveImage from "./images/positive.png";
import NeutralImage from "./images/neutral.png";
import NegativeImage from "./images/negative.png";

const WordCloud = ({ title, hasData, size }) => {
  if (!hasData) {
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

  const imageSrc =
    title === "긍정"
      ? PositiveImage
      : title === "중립"
      ? NeutralImage
      : NegativeImage;

  const containerClassName = `wordcloud-container ${
    size === "large" ? "large" : ""
  }`;

  return (
    <div className="wordcloud-wrapper">
      <div className={containerClassName}>
        <div className="wordcloud-content">
          <img
            src={imageSrc}
            alt={`${title} 이미지`}
            className="wordcloud-image"
          />
        </div>
      </div>
    </div>
  );
};

export default WordCloud;
