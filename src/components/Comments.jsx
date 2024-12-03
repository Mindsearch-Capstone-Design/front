import React, { useState } from "react";
import "./Comments.css";

const Comments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSentiments, setSelectedSentiments] = useState({
    긍정: true,
    중립: true,
    부정: true,
  });

  const totalComments = 21; // 총 댓글 개수 (예시)
  const commentsPerPage = 7;
  const [feedbackMenuOpen, setFeedbackMenuOpen] = useState(null);

  const comments = Array.from({ length: totalComments }, (_, i) => ({
    date: `2024-11-${String(i + 1).padStart(2, "0")}`,
    content: `댓글 내용 ${i + 1}`,
    sentiment: i % 3 === 0 ? "긍정" : i % 3 === 1 ? "중립" : "부정",
  }));

  // 선택된 감정에 따른 댓글 필터링
  const filteredComments = comments.filter(
    (comment) => selectedSentiments[comment.sentiment]
  );

  // 총 페이지 수 계산 (필터링된 댓글의 수에 따라 변경)
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const startIndex = (currentPage - 1) * commentsPerPage;
  const displayedComments = filteredComments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleFeedbackMenu = (index) => {
    setFeedbackMenuOpen(feedbackMenuOpen === index ? null : index);
  };

  const handleFeedbackSelect = (index, feedback) => {
    console.log(`Feedback for comment ${index}: ${feedback}`);
    setFeedbackMenuOpen(null);
  };

  const handleCheckboxChange = (sentiment) => {
    const selectedCount =
      Object.values(selectedSentiments).filter(Boolean).length;

    // 최소 1개 이상의 체크박스가 선택되어야 함
    if (selectedCount === 1 && selectedSentiments[sentiment]) {
      return; // 체크박스 해제를 막음
    }

    setSelectedSentiments((prev) => ({
      ...prev,
      [sentiment]: !prev[sentiment],
    }));

    // 페이지를 1로 초기화하여 필터링된 결과를 첫 페이지부터 볼 수 있도록 함
    setCurrentPage(1);
  };

  return (
    <div className="comments-container">
      <div className="comment-title">
        댓글 분석 결과
        {/* 체크박스 패널 */}
        <div className="comments-checkbox-panel">
          <div
            className={`comments-checkbox ${
              selectedSentiments["긍정"] ? "selected" : ""
            }`}
            onClick={() => handleCheckboxChange("긍정")}
          >
            <div className="comments-checkbox-circle positive"></div>
          </div>
          <div
            className={`comments-checkbox ${
              selectedSentiments["중립"] ? "selected" : ""
            }`}
            onClick={() => handleCheckboxChange("중립")}
          >
            <div className="comments-checkbox-circle neutral"></div>
          </div>
          <div
            className={`comments-checkbox ${
              selectedSentiments["부정"] ? "selected" : ""
            }`}
            onClick={() => handleCheckboxChange("부정")}
          >
            <div className="comments-checkbox-circle negative"></div>
          </div>
        </div>
      </div>
      <div className="comment-header">
        <div className="col">날짜</div>
        <div className="col">댓글</div>
        <div className="col">감정</div>
        <div className="col">피드백</div>
      </div>
      <div className="comment-content">
        {displayedComments.map((comment, index) => (
          <div key={index} className="comment-row">
            <div className="col">{comment.date}</div>
            <div className="col">{comment.content}</div>
            <div className="col">
              <span
                className={`sentiment-container sentiment-${comment.sentiment.toLowerCase()}`}
              >
                {comment.sentiment}
              </span>
            </div>
            <div className="col feedback-col">
              <button
                className="feedback-button"
                onClick={() => toggleFeedbackMenu(index)}
              >
                🚨
              </button>
              {feedbackMenuOpen === index && (
                <div className="feedback-dropdown">
                  <div
                    className="feedback-item"
                    onClick={() => handleFeedbackSelect(index, "긍정")}
                  >
                    긍정
                  </div>
                  <div
                    className="feedback-item"
                    onClick={() => handleFeedbackSelect(index, "중립")}
                  >
                    중립
                  </div>
                  <div
                    className="feedback-item"
                    onClick={() => handleFeedbackSelect(index, "부정")}
                  >
                    부정
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {totalPages >= 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="pagination-info">
            {currentPage} / {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
