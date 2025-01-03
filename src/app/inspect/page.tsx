'use client';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';

import CustomerMemo from '@/app/_components/CustomerMemo';
import BaseCheck from '@/app/_components/BaseCheck';
import { clearBlank } from '../_lib/utils';
import dayjs from 'dayjs';
import VehicleInfo from '../_components/VehicleInfo';
import ManagerMemo from '../_components/ManagerMemo';
import Term from '../_components/Term';
import Microphone from '../_components/Microphone';
import ExteriorCheck from '../_components/ExteriorCheck';
import FloatBottomWrapper from '../_components/FloatBottomWrapper';
import { useRouter } from 'next/navigation';
import MainHeader from '../_components/Header/MainHeader';
import { PATH } from '../_lib/router';

export default function Inspect() {
  const { push } = useRouter();
  const [isClient, setIsClient] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOnOff = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full max-w-1024 my-0 mx-auto">
      <MainHeader />
      <div className="py-16 px-20 w-full flex justify-end text-body8 text-gray2">
        날짜: {dayjs().format('YYYY년 MM월 DD일 HH시 mm분')}
      </div>
      {!!transcript && (
        <div className="px-20 text-body7">transcript: {transcript}</div>
      )}
      <VehicleInfo />
      <CustomerMemo />
      <ExteriorCheck text={clearBlank(transcript)} reset={resetTranscript} />
      <BaseCheck text={transcript} reset={resetTranscript} />
      <ManagerMemo />
      <Term />
      <Microphone
        listening={listening}
        isSupportSpeechRecognition={browserSupportsSpeechRecognition}
        onClick={handleOnOff}
      />
      <FloatBottomWrapper
        label="진단 완료"
        onClick={() => {
          SpeechRecognition.stopListening();
          push(PATH.READY);
        }}
      />
    </div>
  );
}
