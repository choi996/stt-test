"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./page.module.css";

export default function Home() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does support speech recognition.</span>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span>Microphone: {listening ? "on" : "off"}</span>
        <div className={styles.button_wrapper}>
          <button
            onClick={() =>
              SpeechRecognition.startListening({
                language: "ko-KR",
                continuous: true,
              })
            }
          >
            Start
          </button>
          <button onClick={() => SpeechRecognition.stopListening()}>
            Stop
          </button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
        <p style={{ marginTop: 40 }}>tklndfks{transcript}</p>
      </div>
    </div>
  );
}
