"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";

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

  const getIndex = useCallback(
    (type: string) => {
      const okIndex =
        transcript.indexOf(`${type} 예스`) > 0
          ? transcript.indexOf(`${type} 예스`)
          : transcript.indexOf(`${type} yes`);
      const noIndex =
        transcript.indexOf(`${type} 노`) > 0
          ? transcript.indexOf(`${type} 노`)
          : transcript.indexOf(`${type} no`);

      return { okIndex, noIndex };
    },
    [transcript]
  );

  useEffect(() => {
    if (transcript) {
      const engineoil = getIndex("엔진오일");
      if (engineoil.okIndex > 0 || engineoil.noIndex > 0) {
        setEngineoilChecked(
          engineoil.okIndex > engineoil.noIndex ? "ok" : "no"
        );
      }
      const battery = getIndex("배터리");
      if (battery.okIndex > 0 || battery.noIndex > 0) {
        setBatteryChecked(battery.okIndex > battery.noIndex ? "ok" : "no");
      }
      const tire = getIndex("타이어");
      if (tire.okIndex > 0 || tire.noIndex > 0) {
        setTireChecked(tire.okIndex > tire.noIndex ? "ok" : "no");
      }
    }
  }, [transcript, getIndex]);

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
