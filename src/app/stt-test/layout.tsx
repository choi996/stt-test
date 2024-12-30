import { AmazonTranscribeContextProvider } from '../_lib/context/AmazonTranscribeContextProvider';
import { AzureSpeechContextProvider } from '../_lib/context/AzureSpeechContextProvider';
import { DeepgramContextProvider } from '../_lib/context/DeepgramContextProvider';
import { GoogleCloudContextProvider } from '../_lib/context/GoogleCloudContextProvider';
import { MicrophoneContextProvider } from '../_lib/context/MicrophoneContextProvider';
import { ReactSpeechContextProvider } from '../_lib/context/ReactSpeechContextProvider';

export default async function SttTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleCloudContextProvider>
      <AmazonTranscribeContextProvider>
        <AzureSpeechContextProvider>
          <ReactSpeechContextProvider>
            <MicrophoneContextProvider>
              <DeepgramContextProvider>{children}</DeepgramContextProvider>
            </MicrophoneContextProvider>
          </ReactSpeechContextProvider>
        </AzureSpeechContextProvider>
      </AmazonTranscribeContextProvider>
    </GoogleCloudContextProvider>
  );
}
