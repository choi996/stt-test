'use client';

import Deepgram from '../_components/Deepgram';
import { useMicrophone } from '../_lib/context/MicrophoneContextProvider';
import { useDeepgram } from '../_lib/context/DeepgramContextProvider';
import {
  GoogleCloudStateType,
  useGoogleCloud,
} from '../_lib/context/GoogleCloudContextProvider';
import GoogleCloud from '../_components/GoogleCloud';
import { useReactSpeech } from '../_lib/context/ReactSpeechContextProvider';
import ReactSpeechRecognition from '../_components/ReactSpeechRecognition';
import FloatBottomWrapper from '../_components/FloatBottomWrapper';
import Accordion from '../_components/Accordion';

export default function SttTestPage() {
  const { stopMicrophone, microphone } = useMicrophone();
  const { disconnectFromDeepgram } = useDeepgram();
  const { listening, stopTranscript } = useReactSpeech();
  const { googleCloudState, closeSocket } = useGoogleCloud();

  const handleStop = () => {
    stopMicrophone();
    disconnectFromDeepgram();
    closeSocket();
    stopTranscript();
  };

  const isOn =
    listening ||
    microphone?.state === 'recording' ||
    googleCloudState === GoogleCloudStateType.CONNECTING;

  return (
    <>
      <div className=" pb-200">
        {isOn && (
          <p className="fixed top-24 right-20 text-systemRed1 text-heading7 opacity-80">
            마이크 사용중.....
          </p>
        )}
        <Accordion title="Deepgram AI" defaultValue>
          <Deepgram />
        </Accordion>
        <Accordion title="React Speech Recognition">
          <ReactSpeechRecognition />
        </Accordion>
        <Accordion title="Google Cloud STT">
          <GoogleCloud />
        </Accordion>
      </div>
      <FloatBottomWrapper disabled={!isOn} label="stop" onClick={handleStop} />
    </>
  );
}
