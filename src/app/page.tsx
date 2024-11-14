"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Date from "@/components/date";
import VehicleInfo from "@/components/vehicleInfo";
import CustomerMemo from "@/components/customerMemo";
import ExteriorCheck from "@/components/exteriorCheck";
import BaseCheck from "@/components/baseCheck";
import ManagerMemo from "@/components/managerMemo";
import Microphone from "@/components/microphone";
import Term from "@/components/term";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const removeBlank = transcript.replace(/ /g, "");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOnOff = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!isClient) return null;

  return (
    <div className={styles.page}>
      <Header />
      <Date />
      {!!transcript && (
        <div className={styles.transcript}>transcript: {transcript}</div>
      )}
      <VehicleInfo />
      <CustomerMemo />
      <ExteriorCheck text={removeBlank} reset={resetTranscript} />
      <BaseCheck text={transcript} reset={resetTranscript} />
      <ManagerMemo />
      <Term />
      <Microphone
        listening={listening}
        isSupportSpeechRecognition={browserSupportsSpeechRecognition}
        onClick={handleOnOff}
      />
    </div>
  );
}
