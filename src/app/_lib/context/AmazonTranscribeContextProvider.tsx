'use client';

import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export enum AmazonTranscribeStateType {
  READY,
  CONNECTING,
}

interface AmazonTranscribeContextType {
  transcript: string;
  amazonTranscribeState: AmazonTranscribeStateType;
  setupSocket: () => void;
  closeSocket: () => void;
  reset: () => void;
}

const AmazonTranscribeContext = createContext<
  AmazonTranscribeContextType | undefined
>(undefined);

interface AmazonTranscribeContextProviderProps {
  children: ReactNode;
}

function AmazonTranscribeContextProvider({
  children,
}: AmazonTranscribeContextProviderProps) {
  const [amazonTranscribeState, setAmazonTranscribeState] =
    useState<AmazonTranscribeStateType>(AmazonTranscribeStateType.READY);
  const [transcript, setTranscript] = useState('');

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const processor = useRef<ScriptProcessorNode | null>();
  const audioInput = useRef<MediaStreamAudioSourceNode | null>();
  const socket = useRef<Socket | null>(null);

  const closeSocket = () => {
    if (socket.current) {
      setAmazonTranscribeState(AmazonTranscribeStateType.READY);
      socket.current.disconnect();
    }
  };

  const reset = () => {
    setTranscript('');
    closeSocket();
  };

  const setupSocket = () => {
    closeSocket();

    setAmazonTranscribeState(AmazonTranscribeStateType.CONNECTING);

    const ioSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/amazon`); // Socket.IO 서버 연결
    socket.current = ioSocket;

    ioSocket.on('connect', async () => {
      console.log('socket connected');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaRecorder.current = new MediaRecorder(stream);

        audioContext.current = new AudioContext();
        audioInput.current =
          audioContext.current.createMediaStreamSource(stream);
        processor.current = audioContext.current.createScriptProcessor(
          1024,
          1,
          1,
        );
        audioInput.current.connect(processor.current);
        processor.current.connect(audioContext.current.destination);

        processor.current.onaudioprocess = (e) => {
          const float32Array = e.inputBuffer.getChannelData(0);
          const int16Array = new Int16Array(float32Array.length);
          for (let i = 0; i < float32Array.length; i++) {
            int16Array[i] = Math.max(
              -32768,
              Math.min(32767, Math.floor(float32Array[i] * 32768)),
            );
          }

          if (socket.current) {
            socket.current.emit('audioData', int16Array.buffer);
          }
        };

        mediaRecorder.current.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          if (processor.current && audioContext.current) {
            processor.current.disconnect(audioContext.current.destination);
          }
        };
        mediaRecorder.current.start();
        ioSocket.emit('startTranscription');
        console.log('startTranscription event emitted');
      } catch (error) {
        console.error('Error setup to Socket:', error);
      }
    });

    ioSocket.on(
      'transcription',
      (data: { transcript: string; isFinal: boolean }) => {
        console.log('Received transcription:', data);

        if (data.transcript !== '' && data.isFinal) {
          setTranscript((prev) => prev + data.transcript);
        }
      },
    );

    ioSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      if (processor.current) {
        processor.current.disconnect();
        processor.current = null;
      }
      if (audioContext.current) {
        audioContext.current.close();
        audioContext.current = null;
      }
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
        mediaRecorder.current = null;
      }
    });

    ioSocket.on('error', (errorMessage) => {
      console.error('Server error:', errorMessage);
    });
  };

  return (
    <AmazonTranscribeContext.Provider
      value={{
        transcript,
        amazonTranscribeState,
        setupSocket,
        closeSocket,
        reset,
      }}
    >
      {children}
    </AmazonTranscribeContext.Provider>
  );
}

function useAmazonTranscribe(): AmazonTranscribeContextType {
  const context = useContext(AmazonTranscribeContext);

  if (context === undefined) {
    throw new Error(
      'useGoogleCloud must be used within a AmazonTranscribeContextProvider',
    );
  }
  return context;
}

export { AmazonTranscribeContextProvider, useAmazonTranscribe };
