// components/ScrollingQuotes.jsx
import React from 'react';
import './ScrollingQuotes.css';

const quotes = [
    "Communication connects the world—chat bridges the distance.",
    "In a world of noise, chat creates clarity.",
    "Every great conversation starts with a message.",
    "Chats aren’t just words—they are the pulse of connection.",
    "The best ideas are born in a conversation. Start chatting now.",
    "Stay connected, one message at a time.",
    "Bringing people together, one chat at a time.",
    "Your thoughts deserve a platform—let your chat make an impact."
  ];
  

function ScrollingQuotes() {
  return (
    <div className='scrolling-quotes'>
      {quotes.map((quote, index) => (
        <div key={index} className='quote'>
          {quote}
        </div>
      ))}
    </div>
  );
}

export default ScrollingQuotes;
