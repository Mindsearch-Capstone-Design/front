import React from "react";
import "./Rank.css";

const Rank = ({ selectedSentiment }) => {
  const getBackgroundColor = () => {
    if (selectedSentiment === "긍정") {
      return "rgb(186, 227, 255)";
    } else if (selectedSentiment === "중립") {
      return "rgb(164, 255, 144)";
    } else if (selectedSentiment === "부정") {
      return "rgb(255, 231, 243)";
    }
    return "transparent";
  };

  return (
    <div className="rank-container">
      <ul className="rank-list">
        <li
          className="rank-word"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          1위: 키워드1
        </li>
        <li
          className="rank-word"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          2위: 키워드2
        </li>
        <li
          className="rank-word"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          3위: 키워드3
        </li>
        <li
          className="rank-word"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          4위: 키워드4
        </li>
        <li
          className="rank-word"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          5위: 키워드5
        </li>
      </ul>
    </div>
  );
};

export default Rank;
