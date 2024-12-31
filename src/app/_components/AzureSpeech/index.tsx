import {
  AzureSpeechStateType,
  useAzureSpeech,
} from '@/app/_lib/context/AzureSpeechContextProvider';
import Button from '../Button';

export default function AzureSpeech() {
  const { transcript, startTranscript, azureSpeechState, reset } =
    useAzureSpeech();

  return (
    <div className="border-b border-gray9 pb-20 px-20">
      <ul className="mb-16">
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">구현</p>
          <p className="text-body7_m">javascript SDK (client)</p>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7 min-w-80">가격</p>
          <div>
            <p className="text-body7_m">$1 (per hour) / $0.0167 (per minute)</p>
            <p className="text-body7_m text-gray4">매월 5시간 무료</p>
          </div>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">키워드 제공</p>
          <p className="text-body7_m">가능</p>
        </li>
        <li className="flex items-center">
          <p className="w-80 text-gray4 text-body7 ">성능</p>
          <p className="text-body7_m text-systemRed1 bg-systemRed6">상</p>
        </li>
      </ul>
      <Button
        label="start"
        size={32}
        disabled={azureSpeechState === AzureSpeechStateType.CONNECTING}
        onClick={startTranscript}
      />
      <Button
        className="ml-8"
        label="reset"
        size={32}
        color="gray"
        isGhost
        onClick={reset}
      />
      <p className="mt-20">
        <strong>Transcript: </strong>
        {transcript}
      </p>
    </div>
  );
}
