import styles from "./microphone.module.css";
import MicrophoneIcon from "../../assets/icon/Type=microphone.svg";
import Image from "next/image";

interface Props {
  listening: boolean;
  isSupportSpeechRecognition: boolean;
  onClick: () => void;
}

export default function Microphone({
  listening,
  isSupportSpeechRecognition,
  onClick,
}: Props) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper}  ${listening ? styles.on : ""} ${
          isSupportSpeechRecognition ? "" : styles.disabled
        }`}
        onClick={isSupportSpeechRecognition ? onClick : undefined}
      >
        <Image src={MicrophoneIcon} width={24} height={24} alt="마이크" />
      </div>
      {listening && (
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
