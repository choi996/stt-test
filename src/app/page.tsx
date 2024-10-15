"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type RadioTypes = "ok" | "no" | undefined;

export default function Home() {
  const [engineoilChecked, setEngineoilChecked] = useState<RadioTypes>();
  const [batterylChecked, setBatteryChecked] = useState<RadioTypes>();
  const [tireChecked, setTireChecked] = useState<RadioTypes>();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      if (
        transcript.includes("엔진오일 예스") ||
        transcript.includes("엔진오일 yes")
      ) {
        setEngineoilChecked("ok");
      }
      if (
        transcript.includes("엔진오일 노") ||
        transcript.includes("엔진오일 no")
      ) {
        setEngineoilChecked("no");
      }
      if (
        transcript.includes("배터리 예스") ||
        transcript.includes("배터리 yes")
      ) {
        setBatteryChecked("ok");
      }
      if (
        transcript.includes("배터리 노") ||
        transcript.includes("배터리 no")
      ) {
        setBatteryChecked("no");
      }
      if (
        transcript.includes("타이어 예스") ||
        transcript.includes("타이어 yes")
      ) {
        setTireChecked("ok");
      }
      if (
        transcript.includes("타이어 노") ||
        transcript.includes("타이어 no")
      ) {
        setTireChecked("no");
      }
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does support speech recognition.</span>;
  }

  const reset = () => {
    resetTranscript();
    setEngineoilChecked(undefined);
    setBatteryChecked(undefined);
    setTireChecked(undefined);
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
        <p style={{ marginTop: 40 }}>{transcript}</p>

        <div className={styles.check_wrapper}>
          <div>
            <p>엔진오일</p>
            <input
              type="checkbox"
              id="engineoil"
              name="engineoil"
              checked={engineoilChecked === "ok"}
            />
            <label htmlFor="engineoil">이상없음</label>
            <input
              type="checkbox"
              id="engineoil"
              name="engineoil"
              checked={engineoilChecked === "no"}
            />
            <label htmlFor="engineoil">점검필요</label>
          </div>
          <div>
            <p>배터리</p>
            <input
              type="checkbox"
              id="battery"
              name="battery"
              checked={batterylChecked === "ok"}
            />
            <label htmlFor="battery">이상없음</label>
            <input
              type="checkbox"
              id="battery"
              name="battery"
              checked={batterylChecked === "no"}
            />
            <label htmlFor="battery">점검필요</label>
          </div>{" "}
          <div>
            <p>타이어</p>
            <input
              type="checkbox"
              id="tire"
              name="tire"
              checked={tireChecked === "ok"}
            />
            <label htmlFor="tire">이상없음</label>
            <input
              type="checkbox"
              id="tire"
              name="tire"
              checked={tireChecked === "no"}
            />
            <label htmlFor="tire">점검필요</label>
          </div>
        </div>
      </div>
    </div>
  );
}
