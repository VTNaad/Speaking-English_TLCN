import React, { useEffect, useRef } from 'react';
import './ChatBubble.css';

const ChatBubble = ({ text, sender }) => {
  const bubbleClass = sender === 'bot' ? 'bubble bot-bubble' : 'bubble user-bubble';
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Cuộn tới tin nhắn cuối cùng khi nội dung thay đổi
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [text]); // Chạy lại khi có sự thay đổi về tin nhắn mới

  return (
    <div className={bubbleClass} ref={lastMessageRef}>
      {text}
    </div>
  );
};

export default ChatBubble;

