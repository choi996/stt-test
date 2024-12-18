'use client';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import Header from '@/app/_components/header';
import Date from '@/app/_components/date';
import VehicleInfo from '@/app/_components/vehicleInfo';
import CustomerMemo from '@/app/_components/customerMemo';
import ExteriorCheck from '@/app/_components/exteriorCheck';
import BaseCheck from '@/app/_components/baseCheck';
import ManagerMemo from '@/app/_components/managerMemo';
import Microphone from '@/app/_components/microphone';
import Term from '@/app/_components/term';

export default function Inspect() {
  const [isClient, setIsClient] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const removeBlank = transcript.replace(/ /g, '');

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
