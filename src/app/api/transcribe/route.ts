import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from '@aws-sdk/client-transcribe-streaming';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { region, identityPoolId } = process.env;

  // AWS Transcribe Streaming 클라이언트 초기화
  const transcribeClient = new TranscribeStreamingClient({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region }),
      identityPoolId: identityPoolId || '',
    }),
  });

  try {
    const command = new StartStreamTranscriptionCommand({
      LanguageCode: 'en-US',
      MediaEncoding: 'pcm',
      MediaSampleRateHertz: 44100,
    });

    const stream = await transcribeClient.send(command);

    // 클라이언트로 스트리밍 전송
    stream.TranscriptResultStream.on('data', (event) => {
      res.write(JSON.stringify(event.Transcript));
    });

    stream.TranscriptResultStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error('Error starting transcription:', error);
    res.status(500).json({ error: error.message });
  }
}
