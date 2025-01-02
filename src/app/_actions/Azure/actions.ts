'use server';

import { cookies } from 'next/headers';

export async function getAzureSpeechToken() {
  const cookieStore = await cookies();

  const speechToken = cookieStore.get('speech-token')?.value;

  if (speechToken) {
    console.log('Token fetched from cookie: ' + speechToken);

    const idx = speechToken.indexOf(':');
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  } else {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/azure/authenticate`,
        { cache: 'no-store' },
      );

      const data = await res.json();

      const token = data.token;
      const region = data.region;
      cookieStore.set('speech-token', region + ':' + token, {
        maxAge: 540,
        path: '/',
      });

      console.log('Token fetched from back-end: ' + token);
      return { authToken: token, region: region };
    } catch (err) {
      console.log(err);
      return { authToken: null, region: null };
    }
  }
}
