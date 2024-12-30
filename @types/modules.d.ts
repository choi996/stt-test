declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    DEEPGRAM_API_KEY: string;
    AZURE_SPEECH_KEY: string;
    AZURE_SPEECH_REGION: string;
  }
}
