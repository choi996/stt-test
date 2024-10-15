"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [engineoilChecked, setEngineoilChecked] = useState(false);
  const [batterylChecked, setBatteryChecked] = useState(false);
  const [tireChecked, setTireChecked] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      if (transcript.includes("엔진오일")) {
        setEngineoilChecked(true);
        resetTranscript();
      }
      if (transcript.includes("배터리")) {
        setBatteryChecked(true);
        resetTranscript();
      }
      if (transcript.includes("타이어")) {
        setTireChecked(true);
        resetTranscript();
      }
    }
  }, [transcript, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does support speech recognition.</span>;
  }

  const reset = () => {
    resetTranscript();
    setEngineoilChecked(false);
    setBatteryChecked(false);
    setTireChecked(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span>Microphone: {listening ? "on" : "off"}</span>
        <div className={styles.button_wrapper}>
          <button
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
              })
            }
          >
            Start
          </button>
          <button onClick={() => SpeechRecognition.stopListening()}>
            Stop
          </button>
          <button onClick={reset}>Reset</button>
        </div>
        {/* <p style={{ marginTop: 40 }}>{transcript}</p> */}

        <div className={styles.check_wrapper}>
          <div>
            <input
              type="checkbox"
              id="engineoil"
              name="engineoil"
              checked={engineoilChecked}
              onClick={() => setEngineoilChecked((prev) => !prev)}
            />
            <label htmlFor="engineoil">엔진오일</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="battery"
              name="battery"
              checked={batterylChecked}
              onClick={() => setBatteryChecked((prev) => !prev)}
            />
            <label htmlFor="battery">배터리</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="tire"
              name="tire"
              checked={tireChecked}
              onClick={() => setTireChecked((prev) => !prev)}
            />
            <label htmlFor="battery">타이어</label>
          </div>
        </div>
      </div>
    </div>
  );
}
