'use client';

import { getAzureSpeechToken } from '@/app/_actions/Azure/actions';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import {
  AudioConfig,
  PhraseListGrammar,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

export enum AzureSpeechStateType {
  READY,
  CONNECTING,
}

interface AzureSpeechContextType {
  transcript: string;
  azureSpeechState: AzureSpeechStateType;
  startTranscript: () => void;
  stopTranscript: () => void;
  reset: () => void;
}

const AzureSpeechContext = createContext<AzureSpeechContextType | undefined>(
  undefined,
);

interface AuzreSpeechContextProviderProps {
  children: ReactNode;
}

function AzureSpeechContextProvider({
  children,
}: AuzreSpeechContextProviderProps) {
  const [transcript, setTranscript] = useState('');
  const [azureSpeechState, setAzureSpeechState] =
    useState<AzureSpeechStateType>(AzureSpeechStateType.READY);

  const recognizer = useRef<SpeechRecognizer | null>(null);

  const startTranscript = async () => {
    const tokenObj = await getAzureSpeechToken();

    if (!tokenObj) {
      alert('There was an error authorizing your speech key.');
      return;
    }

    setAzureSpeechState(AzureSpeechStateType.CONNECTING);

    const speechConfig = SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region,
    );
    speechConfig.speechRecognitionLanguage = 'ko-KR';

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new SpeechRecognizer(speechConfig, audioConfig);
    const phraseListGrammar = PhraseListGrammar.fromRecognizer(
      recognizer.current,
    );

    phraseListGrammar.addPhrases([
      '엔진오일',
      '배터리',
      '양호',
      'km',
      '외부벨트',
      '텐셔너',
      '전면',
      '헤드램프',
      '테일램프',
      '보닛',
      '본네트',
      '트렁크',
      '누유',
      '누수',
      '주의',
      '교체',
      '오케이',
      '확인',
      '좋아',
    ]);

    recognizer.current.startContinuousRecognitionAsync();

    // recognizer.current.recognizing = (r, event) => {};
    recognizer.current.recognized = (r, event) => {
      console.log(event.result.text);
      setTranscript((prev) => prev + event.result.text);
    };
  };
  const stopTranscript = () => {
    setAzureSpeechState(AzureSpeechStateType.READY);
    if (recognizer.current) {
      recognizer.current.stopContinuousRecognitionAsync();
    }
  };
  const reset = () => {
    stopTranscript();
    setTranscript('');
  };

  return (
    <AzureSpeechContext.Provider
      value={{
        transcript,
        azureSpeechState,
        startTranscript,
        stopTranscript,
        reset,
      }}
    >
      {children}
    </AzureSpeechContext.Provider>
  );
}

function useAzureSpeech(): AzureSpeechContextType {
  const context = useContext(AzureSpeechContext);

  if (context === undefined) {
    throw new Error(
      'useAzureSpeech must be used within a AzureSpeechContextProvider',
    );
  }
  return context;
}

export { AzureSpeechContextProvider, useAzureSpeech };
