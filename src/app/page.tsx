"use client";
import "regenerator-runtime/runtime";
import { useSpeechRecognition } from "react-speech-recognition";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Date from "@/components/date";
import VehicleInfo from "@/components/vehicleInfo";
import CustomerMemo from "@/components/customerMemo";
import ExteriorCheck from "@/components/exteriorCheck";
import BaseCheck from "@/components/baseCheck";
import ManagerMemo from "@/components/managerMemo";
import Microphone from "@/components/microphone";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const removeBlank = transcript.replace(/ /g, "");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={styles.page}>
      <Header />
      <Date />
      {!!transcript && (
        <div className={styles.transcript}>transcript: {transcript}</div>
      )}
      <VehicleInfo />
      <CustomerMemo />
      <ExteriorCheck text={removeBlank} reset={resetTranscript} />
      <BaseCheck text={transcript} reset={resetTranscript} />
      <ManagerMemo />
      <ul className={styles.description_wrapper}>
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
      <div className={styles.privacy}>
        (선택) 개인정보 수집과 이용에 대한 동의
        <br />
        ◻︎ 모바일 자동차 점검 리포트 서비스 및 고객 맞춤형 정비 정보 제공의
        목적으로 차량번호 및 휴대폰번호를 수집합니다. (고객 요청 시 즉시 삭제)
      </div>

      <div className={styles.customer_signature}>
        <div>
          <p>
            고객
            <br />
            서명
          </p>
          <input placeholder="위 내용에 동의합니다." />
        </div>
      </div>
      <div className={styles.homepage}>
        <a href="https://www.speedmate.com" target="_blank">
          www.speedmate.com
        </a>
      </div>
      <Microphone
        status={listening ? "on" : "off"}
        isSupportSpeechRecognition={browserSupportsSpeechRecognition}
      />
    </div>
  );
}
