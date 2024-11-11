import styles from "./microphone.module.css";
import MicrophoneIcon from "../../assets/icon/Type=microphone.svg";
import Image from "next/image";
import SpeechRecognition from "react-speech-recognition";

interface Props {
  status: "on" | "off";
  isSupportSpeechRecognition: boolean;
}

export default function Microphone({
  status,
  isSupportSpeechRecognition,
}: Props) {
  const isOn = status === "on";

  const handleOnOff = () => {
    if (isOn) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "ko" });
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper}  ${isOn ? styles.on : ""} ${
          isSupportSpeechRecognition ? "" : styles.disabled
        }`}
        onClick={isSupportSpeechRecognition ? handleOnOff : undefined}
      >
        <Image src={MicrophoneIcon} width={24} height={24} alt="마이크" />
      </div>
      {isOn && (
        <p>
          마이크 사용중
          <span className={styles.dots} />
        </p>
      )}
      {!isSupportSpeechRecognition && (
        <p className={styles.error}>마이크 사용 불가</p>
      )}
    </div>
  );
}
