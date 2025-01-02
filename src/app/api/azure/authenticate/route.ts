import axios from 'axios';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  const speechKey = process.env.AZURE_SPEECH_KEY;
  const speechRegion = process.env.AZURE_SPEECH_REGION;

  const headers = {
    headers: {
      'Ocp-Apim-Subscription-Key': speechKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers,
    );

    return NextResponse.json(
      { token: tokenResponse.data, region: speechRegion },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        error: 'There was an error authorizing your speech key.',
      },
      {
        status: 401,
      },
    );
  }
}
