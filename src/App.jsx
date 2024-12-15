import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import DefaultImage from "./components/images/default-img.png";
import WordCloudRank from "./components/WordCloudRank";
import PieChart from "./components/PieChart";
import LineGraph from "./components/LineGraph";
import Comments from "./components/Comments";
import "./App.css";

function App() {
  const [hasData, setHasData] = useState(false);
  const [activeButton, setActiveButton] = useState(0);

  // Refs for each section
  const wordCloudRef = useRef(null);
  const chartRef = useRef(null);
  const commentsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const wordCloudPosition = wordCloudRef.current.offsetTop;
      const chartPosition = chartRef.current.offsetTop;
      const commentsPosition = commentsRef.current.offsetTop;

      const chartHeight = chartRef.current.offsetHeight;

      if (
        scrollPosition >= wordCloudPosition &&
        scrollPosition < chartPosition - chartHeight / 1.2
      ) {
        setActiveButton(0);
      } else if (
        scrollPosition >= chartPosition - chartHeight / 2 &&
        scrollPosition < commentsPosition - chartHeight / 2
      ) {
        setActiveButton(1);
      } else if (scrollPosition >= commentsPosition - chartHeight / 2) {
        setActiveButton(2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    setHasData(true);
    setActiveButton(0); // Default active button
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <SideMenu
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        refs={{ wordCloudRef, chartRef, commentsRef }}
      />
      {!hasData ? (
        <div className="default-view">
          <img src={DefaultImage} alt="Default" className="default-img" />
          <p className="default-text">데이터가 없습니다.</p>
        </div>
      ) : (
        <div className="grid-container">
          <div className="wordcloud-rank" ref={wordCloudRef}>
            <WordCloudRank hasData={hasData} />
          </div>
          <div className="charts-container" ref={chartRef}>
            <div className="pie-chart">
              <PieChart hasData={hasData} />
            </div>
            <div className="line-graph">
              <LineGraph />
            </div>
          </div>
          <div className="comments-section" ref={commentsRef}>
            <Comments />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
