"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";

import TireIcon from "../assets/icon/Type=Tire.svg";
import BatteryIcon from "../assets/icon/Type=Battery.svg";
import OilIcon from "../assets/icon/Type=Oil.svg";
import MicroPhoneOn from "../assets/icon/Type=On.svg";
import Image from "next/image";

type RadioTypes = "ok" | "no" | undefined;

const okText = ["yes", "s", "S", "확인", "예스", "예쓰", "이상무"];
const noText = ["no", "노", "점검", "무"];

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
      const removeBlank = transcript.replace(/ /g, "");
      const findOkIndex = okText.findIndex(
        (v) => removeBlank.lastIndexOf(`${type}${v}`) > -1
      );
      const findNoIndex = noText.findIndex(
        (v) => removeBlank.lastIndexOf(`${type}${v}`) > -1
      );

      const okIndex =
        findOkIndex > -1
          ? removeBlank.lastIndexOf(`${type}${okText[findOkIndex]}`)
          : -1;
      const noIndex =
        findNoIndex > -1
          ? removeBlank.lastIndexOf(`${type}${noText[findNoIndex]}`)
          : -1;

      return { okIndex, noIndex };
    },
    [transcript]
  );

  useEffect(() => {
    if (transcript) {
      const engineoil = getIndex("엔진오일");
      if (engineoil.okIndex > -1 || engineoil.noIndex > -1) {
        setEngineoilChecked(
          engineoil.okIndex > engineoil.noIndex ? "ok" : "no"
        );
      }
      const battery = getIndex("배터리");
      if (battery.okIndex > -1 || battery.noIndex > -1) {
        setBatteryChecked(battery.okIndex > battery.noIndex ? "ok" : "no");
      }
      const tire = getIndex("타이어");
      if (tire.okIndex > -1 || tire.noIndex > -1) {
        setTireChecked(tire.okIndex > tire.noIndex ? "ok" : "no");
      }

      if (transcript.includes("스탑") || transcript.includes("stop")) {
        SpeechRecognition.stopListening();
        resetTranscript();
      }
    }
  }, [transcript, getIndex, resetTranscript]);

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
      <header className={styles.header}>안전진단 STT PoC</header>
      <div className={styles.inner}>
        <span>
          마이크: {listening ? "켜짐" : "꺼짐"}{" "}
          {listening && <Image src={MicroPhoneOn} alt="on" />}{" "}
        </span>
        <div className={styles.button_wrapper}>
          <button
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
              })
            }
          >
            마이크 ON
          </button>
          <button
            className={styles.stop_button}
            onClick={() => SpeechRecognition.stopListening()}
          >
            마이크 OFF
          </button>
          <button className={styles.reset_button} onClick={reset}>
            초기화
          </button>
        </div>
        <p style={{ marginTop: 40, whiteSpace: "pre-wrap" }}>
          텍스트: {transcript}
        </p>

        <div className={styles.check_wrapper}>
          <div>
            <p>
              <Image src={OilIcon} alt="oil" />
              엔진오일
            </p>
            <div>
              <input
                type="checkbox"
                id="engineoil"
                name="engineoil"
                checked={engineoilChecked === "ok"}
              />
              <label htmlFor="engineoil">이상없음</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="engineoil"
                name="engineoil"
                checked={engineoilChecked === "no"}
              />
              <label htmlFor="engineoil">점검필요</label>
            </div>
          </div>
          <div>
            <p>
              <Image src={BatteryIcon} alt="battery" />
              배터리
            </p>
            <div>
              <input
                type="checkbox"
                id="battery"
                name="battery"
                checked={batterylChecked === "ok"}
              />
              <label htmlFor="battery">이상없음</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="battery"
                name="battery"
                checked={batterylChecked === "no"}
              />
              <label htmlFor="battery">점검필요</label>
            </div>
          </div>
          <div>
            <p>
              <Image src={TireIcon} alt="tire" />
              타이어
            </p>
            <div>
              <input
                type="checkbox"
                id="tire"
                name="tire"
                checked={tireChecked === "ok"}
              />
              <label htmlFor="tire">이상없음</label>
            </div>
            <div>
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
    </div>
  );
}
