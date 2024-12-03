import React, { useState } from "react";
import WordCloud from "./WordCloud";
import Rank from "./Rank";
import "./WordCloudRank.css";

const WordCloudRank = ({ hasData }) => {
  const [selectedSentiment, setSelectedSentiment] = useState("긍정");

  return (
    <div className="wordcloud-rank-wrapper">
      <div className="wordcloud-content">
        <div className="checkbox-container">
          <input
            type="radio"
            id="positive"
            name="sentiment"
            value="긍정"
            checked={selectedSentiment === "긍정"}
            onChange={() => setSelectedSentiment("긍정")}
          />
          <label htmlFor="positive" className="positive-circle"></label>
          <input
            type="radio"
            id="neutral"
            name="sentiment"
            value="중립"
            checked={selectedSentiment === "중립"}
            onChange={() => setSelectedSentiment("중립")}
          />
          <label htmlFor="neutral" className="neutral-circle"></label>
          <input
            type="radio"
            id="negative"
            name="sentiment"
            value="부정"
            checked={selectedSentiment === "부정"}
            onChange={() => setSelectedSentiment("부정")}
          />
          <label htmlFor="negative" className="negative-circle"></label>
        </div>
        <h2 className="wordcloud-title">워드클라우드</h2>
        <WordCloud title={selectedSentiment} hasData={hasData} size="large" />
      </div>
      <div className="rank-content">
        <h2 className="rank-title">키워드 순위</h2>
        <Rank selectedSentiment={selectedSentiment} />
      </div>
    </div>
  );
};

export default WordCloudRank;
