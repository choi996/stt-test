"use client";
import styles from "./baseCheck.module.css";
import Front from "../../assets/images/vehicle_front.png";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type CheckedTypes = "pass" | "nonpass" | "leak" | undefined;

interface Props {
  text: string;
  reset: () => void;
}

export default function BaseCheck({ text, reset }: Props) {
  const [engineOil, setEngineOil] = useState<CheckedTypes>();
  const [breakOil, setBreakOil] = useState<CheckedTypes>();
  const [steering, setSteering] = useState<CheckedTypes>();
  const [coolant, setCoolant] = useState<CheckedTypes>();
  const [tensioner, setTensioner] = useState<CheckedTypes>();
  const [battery, setBattery] = useState<CheckedTypes>();
  const [wiper, setWiper] = useState<CheckedTypes>();
  const [dashboard, setDashboard] = useState<CheckedTypes>();
  const [airfilter, setAirfilter] = useState<CheckedTypes>();
  const [tirePressure, setTirePressure] = useState<CheckedTypes>();
  const [breakpad, setBreakpad] = useState<CheckedTypes>();
  const [suspension, setSuspension] = useState<CheckedTypes>();
  const [driveShaft, setDriveShaft] = useState<CheckedTypes>();
  const [exLamp, setExLamp] = useState<CheckedTypes>();
  const [evCable, setEvCable] = useState<CheckedTypes>();
  const [evPlug, setEvPlug] = useState<CheckedTypes>();
  const [evGearOil, setEvGearOil] = useState<CheckedTypes>();

  const passTextList = [
    "pass",
    "패스",
    "패쓰",
    "확인",
    "예스",
    "s",
    "S",
    "이상무",
    "yes",
  ];
  const nonpassTextList = [
    "nonpass",
    "논패스",
    "눈패스",
    "논패쓰",
    "주의",
    "교체",
    "교체요",
    "교체필요",
    "no",
    "노",
    "는",
  ];

  const leakTextList = ["leak", "누유", "누수"];

  const getStatus = useCallback(
    (): CheckedTypes => {
      const passIndex = passTextList.findIndex((v) => text.includes(v));

      if (passIndex > -1) {
        return "pass";
      }
      const nonpassIndex = nonpassTextList.findIndex((v) => text.includes(v));

      if (nonpassIndex > -1) {
        return "nonpass";
      }

      const leakIndex = leakTextList.findIndex((v) => text.includes(v));
      if (leakIndex > -1) {
        return "leak";
      }
      return undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text]
  );

  useEffect(() => {
    let isCatch = false;

    const status = getStatus();
    if (text.includes("엔진오일")) {
      setEngineOil(status);
      isCatch = true;
    } else if (text.includes("브레이크오일")) {
      setBreakOil(status);
      isCatch = true;
    } else if (text.includes("스티어링")) {
      setSteering(status);
      isCatch = true;
    } else if (text.includes("냉각수")) {
      setCoolant(status);
      isCatch = true;
    } else if (text.includes("외부벨트") || text.includes("텐셔너")) {
      setTensioner(status);
      isCatch = true;
    } else if (text.includes("배터리")) {
      setBattery(status);
      isCatch = true;
    } else if (text.includes("와이퍼")) {
      setWiper(status);
      isCatch = true;
    } else if (text.includes("계기판")) {
      setDashboard(status);
      isCatch = true;
    } else if (text.includes("공조장치")) {
      setAirfilter(status);
      isCatch = true;
    } else if (text.includes("공기압")) {
      setTirePressure(status);
      isCatch = true;
    } else if (text.includes("브레이크패드") || text.includes("디스크")) {
      setBreakpad(status);
      isCatch = true;
    } else if (text.includes("서스펜션")) {
      setSuspension(status);
      isCatch = true;
    } else if (text.includes("샤프트")) {
      setDriveShaft(status);
    } else if (
      text.includes("등화") ||
      text.includes("조명") ||
      text.includes("램프")
    ) {
      setExLamp(status);
      isCatch = true;
    } else if (text.includes("케이블")) {
      setEvCable(status);
      isCatch = true;
    } else if (text.includes("플러그") || text.includes("블로그")) {
      setEvPlug(status);
      isCatch = true;
    } else if (text.includes("감속기")) {
      setEvGearOil(status);
      isCatch = true;
    }
    if (isCatch) {
      setTimeout(() => {
        reset();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const baseCheckList = [
    {
      title: "엔진오일",
      status: engineOil,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
        {
          label: "누유",
          value: "leak",
        },
      ],
    },
    {
      title: "브레이크 오일",
      status: breakOil,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
        {
          label: "누유",
          value: "leak",
        },
      ],
    },
    {
      title: "스티어링\n시스템",
      status: steering,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
        {
          label: "누유",
          value: "leak",
        },
      ],
    },
    {
      title: "냉각수",
      status: coolant,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
        {
          label: "누수",
          value: "leak",
        },
      ],
    },
    {
      title: "외부벨트/텐셔너",
      status: tensioner,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "배터리",
      status: battery,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "와이퍼",
      status: wiper,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "교체요",
          value: "nonpass",
        },
      ],
    },
    {
      title: "계기판\n경고등 상태",
      status: dashboard,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "공조장치 필터",
      status: airfilter,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "교체요",
          value: "nonpass",
        },
      ],
    },
    {
      title: "타이어 공기압\n마모도",
      status: tirePressure,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "교체요",
          value: "nonpass",
        },
      ],
    },
    {
      title: "브레이크 패드\n/ 디스크",
      status: breakpad,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "서스펜션",
      status: suspension,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "드라이브 샤프트",
      status: driveShaft,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "외부 등화 장치",
      status: exLamp,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "교체요",
          value: "nonpass",
        },
      ],
    },
  ];

  const evCheckList = [
    {
      title: "고전압 케이블",
      status: evCable,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "충전플러그",
      status: evPlug,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
    {
      title: "감속기 오일",
      status: evGearOil,
      checkList: [
        {
          label: "양호",
          value: "pass",
        },
        {
          label: "주의",
          value: "nonpass",
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <div>기본 점검</div>
        <ul>
          {baseCheckList.map((item) => (
            <li className={styles.check_unit_card} key={item.title}>
              <div className={styles.left_wrapper}>
                <Image src={Front} alt="oil" width={40} />
                <p>{item.title}</p>
              </div>
              <div className={styles.right_wrapper}>
                <div>
                  {item.checkList.map((v) => {
                    const type = item.title + v.label;
                    return (
                      <div key={v.label}>
                        <input
                          type="checkbox"
                          id={type}
                          name={type}
                          checked={v.value === item.status}
                          readOnly
                        />
                        <label htmlFor={type}>{v.label}</label>
                      </div>
                    );
                  })}
                </div>
                <textarea className={styles.check_unit_textarea} />
              </div>
            </li>
          ))}
          <div key="ev" className={styles.check_ev_card}>
            <div>
              <div className={styles.left_wrapper}>
                <Image src={Front} alt="oil" width={40} />
                <p>xEV</p>
              </div>
              <ul className={styles.ev_right_wrapper}>
                {evCheckList.map((item) => (
                  <li key={item.title}>
                    <p>{item.title}</p>
                    <div>
                      {item.checkList.map((v) => {
                        const type = item.title + v.label;
                        return (
                          <div key={v.label}>
                            <input
                              type="checkbox"
                              id={type}
                              name={type}
                              checked={v.value === item.status}
                              readOnly
                            />
                            <label htmlFor={type}>{v.label}</label>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
