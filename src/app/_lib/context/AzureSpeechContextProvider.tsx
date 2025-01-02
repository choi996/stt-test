/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import {
  AudioConfig,
  PhraseListGrammar,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { bufferToWave } from '../utils/voice';
import axios from 'axios';

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

  const mediaRecorder = useRef<ScriptProcessorNode | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const audioChunks = useRef<Float32Array[]>([]);
  const mediaStream = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaStream.current = stream;
    audioContext.current = new window.AudioContext();

    const source = audioContext.current.createMediaStreamSource(stream);

    mediaRecorder.current = audioContext.current.createScriptProcessor(
      4096,
      1,
      1,
    );

    mediaRecorder.current.onaudioprocess = function (event) {
      const inputData = event.inputBuffer.getChannelData(0);
      audioChunks.current.push(new Float32Array(inputData));
    };

    source.connect(mediaRecorder.current);
    mediaRecorder.current.connect(audioContext.current.destination);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current && audioContext.current) {
      mediaRecorder.current.disconnect();

      const audioBuffer = audioContext.current.createBuffer(
        1,
        audioChunks.current.length * 4096,
        audioContext.current.sampleRate,
      );
      const channelData = audioBuffer.getChannelData(0);
      let offset = 0;
      audioChunks.current.forEach((chunk) => {
        channelData.set(chunk, offset);
        offset += chunk.length;
      });
      const audioBlob = bufferToWave(audioBuffer);
      const audioURL = URL.createObjectURL(audioBlob);

      const a = document.createElement('a');
      a.href = audioURL;
      a.download = 'recorded_audio.wav';
      a.click();
    }

    if (mediaRecorder.current) {
      mediaRecorder.current.disconnect();
      mediaRecorder.current.onaudioprocess = null;
      mediaRecorder.current = null;
    }

    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
    }
  };

  const startTranscript = async () => {
    try {
      const tokenObj = await axios.get<{ token: string; region: string }>(
        '/api/azure/authenticate',
      );

      console.log('#####tokenObj', tokenObj.data);
      if (!tokenObj) {
        alert('There was an error authorizing your speech key.');
        return;
      }

      // await startRecording();
      setAzureSpeechState(AzureSpeechStateType.CONNECTING);

      const speechConfig = SpeechConfig.fromAuthorizationToken(
        tokenObj.data.token,
        tokenObj.data.region,
      );

      speechConfig.speechRecognitionLanguage = 'ko-KR';

      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      recognizer.current = new SpeechRecognizer(speechConfig, audioConfig);
      const phraseListGrammar = PhraseListGrammar.fromRecognizer(
        recognizer.current,
      );

      phraseListGrammar.addPhrases([
        '엔진오일 양호',
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
      recognizer.current.canceled = (r, event) => {
        console.log('canceled sender', r);
        console.log('canceled event', event);
        setAzureSpeechState(AzureSpeechStateType.READY);
        recognizer.current?.stopContinuousRecognitionAsync();
        alert(event.errorDetails);
      };

      recognizer.current.startContinuousRecognitionAsync(
        () => {
          console.log('Recognition started');
        },
        (err) => {
          console.error('Error starting recognition:', err);
        },
      );

      // recognizer.current.recognizing = (r, event) => {};
      recognizer.current.recognized = (r, event) => {
        console.log(event.result.text);
        setTranscript((prev) => prev + event.result.text);
      };
    } catch (error) {
      console.log(error);
      setAzureSpeechState(AzureSpeechStateType.READY);
    }
  };
  const stopTranscript = async () => {
    setAzureSpeechState(AzureSpeechStateType.READY);
    if (recognizer.current) {
      recognizer.current.stopContinuousRecognitionAsync();
    }

    // await stopRecording();
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
