import React, { useState, useRef, useEffect } from "react";
import { MdClose, MdMessage } from "react-icons/md";
import { BiSolidUser, BiSend } from "react-icons/bi";
import "./chatbox.css";

const Chatbox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([
    { role: "incoming", content: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatInputRef = useRef(null);
  const questionBoxRef = useRef(null);
  const chatListRef = useRef(null);

  const predefinedAnswers = {
    "miễn phí vận chuyển": "Dạ có ạ! Đơn hàng từ 300k sẽ được freeship.",
    "giảm giá": "Hiện tại shop đang giảm giá 20% cho toàn bộ áo thun.",
    "còn hàng không": "Sản phẩm vẫn còn hàng bạn nhé!",
    mua: "Bạn muốn mua sản phẩm nào ạ?",
    hello: "Hello! Chúc bạn một ngày tốt lành!",
  };

  const getAutoReply = (text) => {
    const lower = text.toLowerCase();
    for (const key in predefinedAnswers) {
      if (lower.includes(key)) return predefinedAnswers[key];
    }
    return "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi lại rõ hơn không?";
  };

  const appendMessage = (role, content) => {
    setMessageHistory((prev) => [...prev, { role, content }]);
  };

  const handleSend = () => {
    if (!userMessage.trim()) return;
    const message = userMessage;
    appendMessage("outgoing", message);
    setUserMessage("");

    setTimeout(() => {
      appendMessage("incoming", getAutoReply(message));
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChatbot = () => setShowChatbot((s) => !s);

  const handleInputFocus = () => {
    if (questionBoxRef.current) questionBoxRef.current.style.display = "block";
  };

  useEffect(() => {
    const chatList = chatListRef.current;
    if (chatList) chatList.scrollTop = chatList.scrollHeight;
  }, [messageHistory]);

  const predefinedQuestions = [
    "Mua hàng có được miễn phí vận chuyển không?",
    "Có sản phẩm giảm giá trong tháng này không?",
    "Sản phẩm này còn hàng không?",
  ];

  const handleQuestionClick = (q) => {
    appendMessage("outgoing", q);
    if (questionBoxRef.current) questionBoxRef.current.style.display = "none";
    setTimeout(() => appendMessage("incoming", getAutoReply(q)), 500);
  };

  return (
    <div className={`Chatbox ${showChatbot ? "show-chatbot" : ""}`}>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span>
          <MdMessage />
        </span>
        <span>
          <MdClose />
        </span>
      </button>

      <div className="chatbot">
        <header>
          <h2>Hỗ trợ khách hàng</h2>
          <span className="close-btn" onClick={toggleChatbot}>
            <MdClose />
          </span>
        </header>

        <ul className="chatbox-list" ref={chatListRef}>
          {messageHistory.map((msg, i) => (
            <li key={i} className={`chat ${msg.role}`}>
              {msg.role === "incoming" && (
                <span>
                  <BiSolidUser />
                </span>
              )}
              <p>{msg.content}</p>
            </li>
          ))}
        </ul>

        <div className="chat-input">
          <textarea
            placeholder="Nhập tin nhắn..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            ref={chatInputRef}
          />
          <span className="send-btn" onClick={handleSend}>
            <BiSend />
          </span>
        </div>

        <div className="question-box" ref={questionBoxRef}>
          <ul>
            {predefinedQuestions.map((q, i) => (
              <li
                key={i}
                className="question"
                onClick={() => handleQuestionClick(q)}
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
