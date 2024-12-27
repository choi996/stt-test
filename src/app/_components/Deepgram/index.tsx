'use client';

import {
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from '@/app/_lib/context/DeepgramContextProvider';
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from '@/app/_lib/context/MicrophoneContextProvider';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Loading from '../Loading';

export default function Deepgram() {
  const [transcript, setTranscript] = useState<string>('');

  const {
    connection,
    connectToDeepgram,
    connectionState,
    disconnectFromDeepgram,
  } = useDeepgram();
  const {
    setupMicrophone,
    microphone,
    startMicrophone,
    microphoneState,
    stopMicrophone,
  } = useMicrophone();

  const captionTimeout = useRef<NodeJS.Timeout | null>(null);
  const keepAliveInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (microphoneState === MicrophoneState.Ready) {
      connectToDeepgram({
        model: 'nova-2',
        interim_results: true,
        smart_format: true,
        filler_words: true,
        utterance_end_ms: 3000,
        language: 'ko-KR',
        keywords: [
          '엔진오일:5',
          '외부벨트:5',
          '텐셔너:5',
          '스티어링 시스템:5',
          '배터리:5',
          '브레이크 오일:5',
          '냉각수:5',
          '와이퍼:5',
        ],
        replace: ['텐션어:텐셔너', '텐셔노:텐셔너', '텐션:텐셔너'],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState]);

  useEffect(() => {
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      // iOS SAFARI FIX:
      // Prevent packetZero from being sent. If sent at size 0, the connection will close.
      if (e.data.size > 0) {
        connection?.send(e.data);
      }
    };

    const onTranscript = (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      const thisCaption = data.channel.alternatives[0].transcript;

      if (thisCaption !== '' && isFinal && speechFinal) {
        setTranscript((prev) => prev + thisCaption);
      }
    };

    if (connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      // prettier-ignore
      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      clearTimeout(captionTimeout.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionState]);

  useEffect(() => {
    if (!connection) return;

    if (
      microphoneState !== MicrophoneState.Open &&
      connectionState === LiveConnectionState.OPEN
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 10000);
    } else {
      clearInterval(keepAliveInterval.current as NodeJS.Timeout);
    }

    return () => {
      clearInterval(keepAliveInterval.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState, connectionState]);

  const handleReset = () => {
    setTranscript('');
    stopMicrophone();
    disconnectFromDeepgram();
  };
  return (
    <div className="border-b border-gray9 pb-20 px-20">
      <ul className="mb-16">
        <li className="flex items-center mb-8">
          <p className="w-80 text-gray4 text-body7">구현</p>
          <p className="text-body7_m">javascript SDK (client)</p>
        </li>
        <li className="flex items-center mb-8">
          <p className="w-80 text-gray4 text-body7">모델</p>
          <p className="text-body7_m">nova-2 (권장)</p>
        </li>
        <li className="flex items-center mb-8">
          <p className="w-80 text-gray4 text-body7">가격</p>
          <p className="text-body7_m">$0.0043 (per minute)</p>
        </li>
        <li className="flex items-center mb-8">
          <p className="w-80 text-gray4 text-body7">키워드 제공</p>
          <p className="text-body7_m">가능</p>
        </li>
        <li className="flex items-center">
          <p className="w-80 text-gray4 text-body7">성능</p>
          <p className="text-body7_m">하</p>
        </li>
      </ul>
      <div className="flex items-center">
        <Button
          label="start"
          size={32}
          disabled={microphone?.state === 'recording'}
          onClick={setupMicrophone}
        />
        <Button
          className="ml-8"
          label="reset"
          size={32}
          color="gray"
          isGhost
          onClick={handleReset}
        />
      </div>
      <p className="mt-20 break-words">
        <strong>Transcript: </strong>
        {transcript}
      </p>
      <Loading
        isVisible={connectionState === LiveConnectionState.CONNECTING}
        text="Connecting Deepgram..."
      />
    </div>
  );
}
