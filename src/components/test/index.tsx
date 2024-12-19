'use client';
import React from 'react';

const TTSButton = ({ text }: { text: string }) => {
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('이 브라우저는 TTS를 지원하지 않습니다.');
    }
  };

  return <button onClick={speakText}>읽기</button>;
};

export default TTSButton;
