import { useReactSpeech } from '@/app/_lib/context/ReactSpeechContextProvider';
import Button from '../Button';

export default function ReactSpeechRecognition() {
  const { transcript, listening, startTranscript, resetTranscript } =
    useReactSpeech();

  return (
    <div className="border-b border-gray9 pb-20 px-20">
      <ul className="mb-16">
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">구현</p>
          <p className="text-body7_m">npm library</p>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">가격</p>
          <p className="text-body7_m">free</p>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">키워드 제공</p>
          <p className="text-body7_m">불가</p>
        </li>
        <li className="flex items-center">
          <p className="w-80 text-gray4 text-body7">성능</p>
          <p className="text-body7_m">중</p>
        </li>
      </ul>
      <Button
        label="start"
        isFull={false}
        disabled={listening}
        size={32}
        color="gray"
        onClick={startTranscript}
      />
      <Button
        className="ml-8"
        label="reset"
        isFull={false}
        size={32}
        color="gray"
        isGhost
        onClick={resetTranscript}
      />
      <p className="mt-20">
        <strong>Transcript: </strong>
        {transcript}
      </p>
    </div>
  );
}
