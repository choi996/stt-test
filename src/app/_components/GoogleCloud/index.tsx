import Button from '../Button';
import {
  GoogleCloudStateType,
  useGoogleCloud,
} from '@/app/_lib/context/GoogleCloudContextProvider';

export default function GoogleCloud() {
  const { transcript, googleCloudState, setupSocket, reset } = useGoogleCloud();

  return (
    <div className="border-b border-gray9 pb-20 px-20">
      <ul className="mb-16">
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">구현</p>
          <p className="text-body7_m">socket, javascript SDK (server)</p>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7">모델</p>
          <p className="text-body7_m">default (권장)</p>
        </li>
        <li className="flex items-start mb-8">
          <p className="w-80 text-gray4 text-body7 min-w-80">가격</p>
          <div>
            <p className="text-body7_m">$0.024 (per minute)</p>
            <p className="text-body7_m text-gray4">
              $300 credit (90일 동안 사용 가능), 60분 무료 음성 인식 제공 (per
              month)
            </p>
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
        disabled={googleCloudState === GoogleCloudStateType.CONNECTED}
        onClick={setupSocket}
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
