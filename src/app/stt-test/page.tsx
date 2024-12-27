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
import TranscribePage from '../_components/AmazonTarnscribe';
import {
  AmazonTranscribeStateType,
  useAmazonTranscribe,
} from '../_lib/context/AmazonTranscribeContextProvider';

export default function SttTestPage() {
  const { stopMicrophone, microphone } = useMicrophone();
  const { disconnectFromDeepgram } = useDeepgram();
  const { listening, stopTranscript } = useReactSpeech();
  const { googleCloudState, closeSocket } = useGoogleCloud();
  const { amazonTranscribeState, closeSocket: amazonCloseSocket } =
    useAmazonTranscribe();

  const handleStop = () => {
    stopMicrophone();
    disconnectFromDeepgram();
    closeSocket();
    stopTranscript();
    amazonCloseSocket();
  };

  console.log('###NEXT_PUBLIC_API_URL###', process.env.NEXT_PUBLIC_API_URL);
  console.log('###API_URL###', process.env.API_URL);

  const isOn =
    listening ||
    microphone?.state === 'recording' ||
    googleCloudState === GoogleCloudStateType.CONNECTING ||
    amazonTranscribeState === AmazonTranscribeStateType.CONNECTING;

  return (
    <>
      <div className=" pb-200">
        {isOn && (
          <p className="fixed top-24 right-20 text-systemRed1 text-heading7 opacity-80">
            마이크 사용중.....
          </p>
        )}
        <Accordion title="Google Cloud STT" defaultValue>
          <GoogleCloud />
        </Accordion>
        <Accordion title="React Speech Recognition">
          <ReactSpeechRecognition />
        </Accordion>
        <Accordion title="Amazon Transcribe">
          <TranscribePage />
        </Accordion>
        <Accordion title="Deepgram AI">
          <Deepgram />
        </Accordion>
      </div>
      <FloatBottomWrapper disabled={!isOn} label="stop" onClick={handleStop} />
    </>
  );
}
