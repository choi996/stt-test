/* eslint-disable @next/next/no-img-element */
'use client';
import { useRef, useState } from 'react';
import Alert from '../Alert2';
import SignatureCanvas from '../SignatureCanvas2';

export default function CustomerMemo() {
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

  const toggleAlert = () => setIsOpenAlert((prev) => !prev);

  const renderSignature = () => {
    return (
      <div
        className="flex items-center xs:justify-center relative xs:p-12 w-full"
        onClick={toggleAlert}
      >
        {!!signatureImage ? (
          <img
            className="absolute bottom-[-20px] left-0"
            src={signatureImage}
            width={120}
            style={{ maxHeight: 40 }}
            alt="서명"
          />
        ) : (
          <button className="text-gray4 text-body7 p-0">Signature</button>
        )}
      </div>
    );
  };
  
  return (
    <div className="pt-0 px-20 pb-8">
      <div className="border border-solid border-gray2 rounded-lg flex">
        <p className="text-center py-12 px-20 min-w-96 bg-gray11 rounded-tl-lg rounded-bl-lg text-heading8">
          고 객<br />요 청<br />사 항
        </p>
        <textarea className="rounded-tr-lg rounded-br-lg" />
        <div className="hidden xs:block w-1/3 min-w-120 rounded-br-lg border-l border-solid border-gray2">
          <p className="py-12 px-20 text-center text-heading8 bg-gray11 rounded-tr-lg">
            점검 담당자
          </p>
          {renderSignature()}
        </div>
      </div>
      <div className="xs:hidden flex items-center mt-12 gap-12">
        <p className="text-body7 min-w-84 text-gray4">* 점검 담당자:</p>{' '}
        {renderSignature()}
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
