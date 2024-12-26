'use client';

import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export enum GoogleCloudStateType {
  READY,
  CONNECTING,
}

interface GoogleCloudContextType {
  transcript: string;
  isTalking: boolean;
  googleCloudState: GoogleCloudStateType;
  setupSocket: () => void;
  closeSocket: () => void;
  reset: () => void;
}

const GoogleCloudContext = createContext<GoogleCloudContextType | undefined>(
  undefined,
);

interface GoogleCloudContextProviderProps {
  children: ReactNode;
}

function GoogleCloudContextProvider({
  children,
}: GoogleCloudContextProviderProps) {
  const [googleCloudState, setGoogleCloudState] =
    useState<GoogleCloudStateType>(GoogleCloudStateType.READY);
  const [isTalking, setIsTalking] = useState(false);
  const [transcript, setTranscript] = useState('');

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const processor = useRef<AudioWorkletNode | null>();
  const audioChunks = useRef<Uint8Array[]>([]);
  const socket = useRef<Socket | null>(null);

  const closeSocket = () => {
    if (socket.current) {
      setGoogleCloudState(GoogleCloudStateType.READY);
      socket.current.disconnect();
    }
  };

  const setupSocket = () => {
    closeSocket();

    setGoogleCloudState(GoogleCloudStateType.CONNECTING);

    const ioSocket = io('http://localhost:8000'); // Socket.IO 서버 연결
    socket.current = ioSocket;

    ioSocket.on('connect', async () => {
      console.log('socket connected');
      try {
        const sampleRate = 16000;
        const chunkRate = 100;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: sampleRate,
            channelCount: 1,
            echoCancellation: true,
          },
        });

        mediaRecorder.current = new MediaRecorder(stream);

        audioContext.current = new window.AudioContext({
          sampleRate: sampleRate,
        });

        await audioContext.current.audioWorklet.addModule(
          './linear16-processor.js',
        );

        const source = audioContext.current.createMediaStreamSource(stream);
        processor.current = new AudioWorkletNode(
          audioContext.current,
          'linear16-processor',
        );

        processor.current.port.onmessage = (event) => {
          if (socket.current) {
            socket.current.emit('audioData', event.data);
            audioChunks.current.push(
              new Int16Array(event.data) as unknown as Uint8Array,
            );
          }
        };

        const analyser = audioContext.current.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        source.connect(processor.current);
        processor.current.connect(audioContext.current.destination);

        source.connect(analyser);

        const detectTalking = () => {
          if (!socket.current) {
            return;
          }

          analyser.getByteFrequencyData(dataArray);
          const avgVolume =
            dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

          if (avgVolume > 50) {
            setIsTalking(true);
          } else {
            setIsTalking(false);
          }

          requestAnimationFrame(detectTalking);
        };

        detectTalking();

        mediaRecorder.current.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          if (processor.current && audioContext.current) {
            source.disconnect(processor.current);
            processor.current.disconnect(audioContext.current.destination);
          }
        };

        mediaRecorder.current.start(chunkRate);
      } catch (error) {
        console.error(error);
      }
    });

    ioSocket.on('transcript', (data: { transcript: string }) => {
      console.log('###', data.transcript);
      setTranscript(data.transcript);
    });

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

    ioSocket.on('connect_error', (error) => {
      console.error('Socket.IO Error:', error);
      setTranscript('');
    });
  };

  const reset = () => {
    setTranscript('');
    closeSocket();
  };

  return (
    <GoogleCloudContext.Provider
      value={{
        transcript,
        isTalking,
        googleCloudState,
        setupSocket,
        closeSocket,
        reset,
      }}
    >
      {children}
    </GoogleCloudContext.Provider>
  );
}

function useGoogleCloud(): GoogleCloudContextType {
  const context = useContext(GoogleCloudContext);

  if (context === undefined) {
    throw new Error(
      'useGoogleCloud must be used within a GoogleCloudContextProvider',
    );
  }
  return context;
}

export { GoogleCloudContextProvider, useGoogleCloud };
