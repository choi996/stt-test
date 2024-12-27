import Button from '../Button';
import { useAmazonTranscribe } from '@/app/_lib/context/AmazonTranscribeContextProvider';

export default function AmazonTranscribe() {
  const { transcript, setupSocket, reset } = useAmazonTranscribe();

  return (
    <div className="px-20">
      <ul className="mb-16">
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">구현</p>
          <p className="text-body7_m">socket, javascript SDK (server)</p>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7 min-w-80">가격</p>
          <div>
            <p className="text-body7_m">$0.024 (per minute)</p>
            <p className="text-body7_m text-gray4">T1(처음 250,000분) $0.024</p>
            <p className="text-body7_m text-gray4">T2(다음 750,000분) $0.015</p>
            <p className="text-body7_m text-gray4">이후 $0.0102</p>
          </div>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">키워드 제공</p>
          <p className="text-body7_m">가능</p>
        </li>
        <li className="flex items-center">
          <p className="w-80 text-gray4 text-body7 ">성능</p>
          <p className="text-body7_m">중</p>
        </li>
      </ul>
      <Button label="start" size={32} onClick={setupSocket} />
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
