"use client";
import styles from "./baseCheck.module.css";
import Front from "../../assets/images/vehicle_front.png";
import Image from "next/image";
import { useEffect } from "react";
import {
  exteriorFrontCheck,
  exteriorLeftCheck,
  exteriorRearCheck,
  exteriorRightCheck,
} from "@/app/utils";
import { baseCheckList, evCheckList } from "@/constants/strings";

interface Props {
  text: string;
}

export default function BaseCheck({ text }: Props) {
  useEffect(() => {
    if (text) {
      const removeBlank = text.replace(/ /g, "");

      if (removeBlank.includes("전면")) {
        exteriorFrontCheck(removeBlank);
      } else if (removeBlank.includes("후면")) {
        exteriorRearCheck(removeBlank);
      } else if (removeBlank.includes("왼쪽")) {
        exteriorLeftCheck(removeBlank);
      } else if (removeBlank.includes("오른쪽")) {
        exteriorRightCheck(removeBlank);
      }
    }
  }, [text]);

  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <p>기본 점검</p>
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
                          // checked={}
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
                              // checked={}
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
