import { StaticImageData } from "next/image";

export type PartKeyTypes =
  | "engine_oil"
  | "brake_oil"
  | "steering"
  | "coolant"
  | "tensioner"
  | "battery"
  | "wiper"
  | "dashboard"
  | "airfilter"
  | "tire_pressure"
  | "brake_pad"
  | "suspension"
  | "drive_shaft"
  | "lamp"
  | "cable"
  | "plug"
  | "gear_oil";

export type PartTypes =
  | "엔진오일"
  | "브레이크 오일"
  | "스티어링 시스템"
  | "냉각수"
  | "외부벨트/텐셔너"
  | "배터리"
  | "와이퍼"
  | "계기판 경고등 상태"
  | "공조장치 필터"
  | "타이어 공기압 마모도"
  | "브레이크 패드/디스크"
  | "서스펜션"
  | "드라이브 샤프트"
  | "외부 등화 장치"
  | "고전압 케이블"
  | "충전 플러그"
  | "감속기 오일";

export type CheckListTypes = {
  title: PartTypes;
  key: PartKeyTypes;
  icon?: StaticImageData;
  checkList: {
    label: "양호" | "주의" | "교체" | "교체요" | "누유" | "누수";
    value: 0 | 1 | 2;
  }[];
};
