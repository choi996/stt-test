import { DeepgramContextProvider } from '../_lib/context/DeepgramContextProvider';
import { GoogleCloudContextProvider } from '../_lib/context/GoogleCloudContextProvider';
import { MicrophoneContextProvider } from '../_lib/context/MicrophoneContextProvider';
import { ReactSpeechContextProvider } from '../_lib/context/ReactSpeechContextProvider';

export default function SttTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleCloudContextProvider>
      <ReactSpeechContextProvider>
        <MicrophoneContextProvider>
          <DeepgramContextProvider>{children}</DeepgramContextProvider>
        </MicrophoneContextProvider>
      </ReactSpeechContextProvider>
    </GoogleCloudContextProvider>
  );
}
