'use client';

import { createContext, ReactNode, useContext } from 'react';

import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface ReactSpeechContextType {
  transcript: string;
  listening: boolean;
  startTranscript: () => void;
  stopTranscript: () => void;
  resetTranscript: () => void;
}

const ReactSpeechContext = createContext<ReactSpeechContextType | undefined>(
  undefined,
);

interface ReactSpeechContextProviderProps {
  children: ReactNode;
}

function ReactSpeechContextProvider({
  children,
}: ReactSpeechContextProviderProps) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startTranscript = () => {
    SpeechRecognition.startListening({ continuous: true });
  };
  const stopTranscript = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <ReactSpeechContext.Provider
      value={{
        transcript,
        listening,
        startTranscript,
        stopTranscript,
        resetTranscript,
      }}
    >
      {children}
    </ReactSpeechContext.Provider>
  );
}

function useReactSpeech(): ReactSpeechContextType {
  const context = useContext(ReactSpeechContext);

  if (context === undefined) {
    throw new Error(
      'useReactSpeech must be used within a ReactSpeechContextProvider',
    );
  }
  return context;
}

export { ReactSpeechContextProvider, useReactSpeech };
