import React, { useState } from "react";
import axios from "axios";
import "./Header.css";
import HeaderLogo from "./images/TeamLogo.png";
import InstagramLogo from "./images/instagram.png";
import YoutubeLogo from "./images/youtube.png";
import SearchIcon from "./images/search.png";

const Header = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("");

  // 서버로 데이터 전송
  const sendToServer = async () => {
    const payload = {
      channel_name: keyword,
      start_date: startDate,
      end_date: endDate,
      file_name: `${platform}_comments.csv`,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/crawl_comments",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000, // 5초
        }
      );

      const data = response.data;
      alert(`성공: ${data.message}\n저장된 댓글 수: ${data.comments_count}`);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`오류 발생: ${error.response.data.error || "알 수 없는 오류"}`);
      } else {
        console.error("데이터 전송 실패:", error);
        alert("서버와의 통신에 실패했습니다.");
      }
    }
  };

  // 검색 버튼 클릭 또는 엔터 키 입력 처리
  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("기간을 설정하세요");
      return;
    }
    if (keyword.trim().length < 2) {
      alert("검색어는 두 글자 이상으로 입력하세요");
      return;
    }
    if (!platform) {
      alert("플랫폼을 선택하세요");
      return;
    }
    sendToServer(); // 서버로 데이터 전송
  };

  // 엔터 키 입력 처리
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="header-container">
      <img
        src={HeaderLogo}
        alt="Team Logo"
        className="header-logo"
        onClick={refreshPage}
      />
      <div className="header-content">
        <div className="search-period">
          <input
            type="date"
            id="start-date"
            className={`date-select ${startDate ? "date-active" : ""}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          ~
          <input
            type="date"
            id="end-date"
            className={`date-select ${endDate ? "date-active" : ""}`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="platform-select">
          <div className="custom-dropdown">
            <button
              className={`dropdown-button ${!platform ? "placeholder" : ""}`}
            >
              {platform ? (
                <>
                  <img
                    src={platform === "youtube" ? YoutubeLogo : InstagramLogo}
                    alt={platform}
                    className="dropdown-selected-icon"
                  />
                  {platform === "youtube" ? "유튜브" : "인스타그램"}
                </>
              ) : (
                "플랫폼"
              )}
            </button>
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => setPlatform("youtube")}
              >
                <img
                  src={YoutubeLogo}
                  alt="YouTube Logo"
                  className="dropdown-icon"
                />
                유튜브
              </div>
              <div
                className="dropdown-item"
                onClick={() => setPlatform("instagram")}
              >
                <img
                  src={InstagramLogo}
                  alt="Instagram Logo"
                  className="dropdown-icon"
                />
                인스타그램
              </div>
            </div>
          </div>
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            className={`input-height ${
              keyword.trim() !== "" ? "input-active" : ""
            }`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button className="input-button" onClick={handleSearch}>
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
