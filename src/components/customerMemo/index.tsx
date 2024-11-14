"use client";
import { useRef, useState } from "react";
import Alert from "../alert";
import SignatureCanvas from "../signatureCanvas";
import styles from "./customerMemo.module.css";

export default function CustomerMemo() {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [signatureImage, setSignatureImage] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isCanvasEmpty = () => {
    if (!canvasRef.current) return true;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return true;

    const canvasData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
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
      return alert("서명을 해주세요.");
    } else {
      const dataURL = canvasRef.current.toDataURL("image/png");
      setSignatureImage(dataURL);
      toggleAlert();
    }
  };

  const toggleAlert = () => setIsOpenAlert((prev) => !prev);

  const renderSignature = () => {
    return (
      <div className={styles.signature_wrapper} onClick={toggleAlert}>
        {!!signatureImage ? (
          <img
            src={signatureImage}
            width={120}
            style={{ maxHeight: 40 }}
            alt="서명"
          />
        ) : (
          <button className={styles.signature_button}>Signature</button>
        )}
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <p>
          고 객<br />요 청<br />사 항
        </p>
        <textarea />
        <div>
          <p>점검 담당자</p>
          {renderSignature()}
        </div>
      </div>
      <div className={styles.check_mamager}>
        <p>* 점검 담당자:</p> {renderSignature()}
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
