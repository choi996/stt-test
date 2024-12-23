/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import Alert from '../Alert';
import SignatureCanvas from '../SignatureCanvas';

export default function Term() {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [signatureImage, setSignatureImage] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isCanvasEmpty = () => {
    if (!canvasRef.current) return true;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return true;

    const canvasData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    ).data;

    for (let i = 0; i < canvasData.length; i += 4) {
      if (canvasData[i + 3] !== 0) {
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    if (isCanvasEmpty()) {
      return alert('서명을 해주세요.');
    } else {
      const dataURL = canvasRef.current.toDataURL('image/png');
      setSignatureImage(dataURL);
      toggleAlert();
    }
  };

  const toggleAlert = () => {
    setIsOpenAlert((prev) => !prev);
  };

  return (
    <div className="pb-120">
      <ul
        className="pt-8 px-20 pb-20 
        [&>li]:flex [&>li]:gap-6 [&>li]:text-body11 [&>li]:text-gray3
        [&>li]:before:content-['▶︎']"
      >
        <li>
          상기 내용은 당사 매장에서 제공하는 점검 서비스로 점검 당시의 차량
          상태에 대한 결과이며, 출고 이후 차량 성능을 보증하는 것은 아님을
          알려드립니다.
        </li>
        <li>
          {`해당 점검 서비스는 자동차관리법에 의거 시행하는 '정기점사'와
          무관합니다. 향후 자동차 관리법에 따른 '정기검사'를 별도로 받으셔야
          합니다.`}
        </li>
        <li>
          점검 시 발견된 정밀진단이 요구 되거나, 수리가 필요한 항목은 고객님
          동의 하에 진행되며 별도의 비용이 발생할 수 있습니다.
        </li>
      </ul>
      <div className="px-20 text-body11 text-gray3">
        (선택) 개인정보 수집과 이용에 대한 동의
        <br />
        ◻︎ 모바일 자동차 점검 리포트 서비스 및 고객 맞춤형 정비 정보 제공의
        목적으로 차량번호 및 휴대폰번호를 수집합니다. (고객 요청 시 즉시 삭제)
      </div>
      <div className="flex justify-end mt-12 px-20 pb-40">
        <div className="flex items-center border border-solid border-gray2 rounded-lg">
          <p className="bg-gray11 rounded-tl-lg rounded-bl-lg p-8 text-body11">
            고객
            <br />
            서명
          </p>
          <div
            className="relative w-160 flex items-center"
            onClick={toggleAlert}
          >
            {!!signatureImage ? (
              <img
                src={signatureImage}
                width={120}
                style={{ maxHeight: 40 }}
                alt="서명"
              />
            ) : (
              <button className="text-body11 text-gray5 ml-12">
                위 내용에 동의합니다.
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mb-40 text-gray5">
        <a href="https://www.speedmate.com" target="_blank">
          www.speedmate.com
        </a>
      </div>
      <Alert
        title="서명"
        isVisible={isOpenAlert}
        onClose={toggleAlert}
        onPrimaryClick={handleSave}
        onSecondaryClick={toggleAlert}
      >
        <SignatureCanvas canvasRef={canvasRef} />
      </Alert>
    </div>
  );
}
