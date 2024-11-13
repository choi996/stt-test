"use client";
import styles from "./baseCheck.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import EVIcon from "../../assets/icon/Type=EV.png";
import axios from "axios";
import { debounce } from "@/app/utils";
import { PartKeyTypes } from "@/constants/types";
import { QueryResponse } from "@/constants/interface";
import { baseCheckList, evCheckList } from "./checklist";

interface Props {
  text: string;
  reset: () => void;
}

export default function BaseCheck({ text, reset }: Props) {
  const [result, setResult] = useState<{ [key in PartKeyTypes]: 0 | 1 | 2 }>();

  useEffect(() => {
    if (text) {
      const getTranscript = async () => {
        try {
          const { data } = await axios.post<QueryResponse>(
            "https://5ddd-206-219-44-244.ngrok-free.app/query",
            {
              text,
            }
          );
          if (!!data.text) {
            const newResult = {
              [data.part_key]: data.check_status,
            } as { [key in PartKeyTypes]: 0 | 1 | 2 };
            setResult((prev) =>
              !prev ? newResult : { ...prev, ...newResult }
            );
            reset();
          }
        } catch (error) {
          console.log(error);
        }
      };
      debounce(() => getTranscript(), 1000);
    }
  }, [text, reset]);

  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <div>기본 점검</div>
        <ul>
          {baseCheckList.map((item) => (
            <li className={styles.check_unit_card} key={item.title}>
              <div className={styles.left_wrapper}>
                {item.icon && (
                  <Image src={item.icon} alt={item.title} width={40} />
                )}
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
                          checked={v.value === result?.[item.key]}
                          // onChange={() =>
                          //   item.setStatus(v.value as CheckedTypes)
                          // }
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
                <Image src={EVIcon} alt="EV" width={40} />
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
                              checked={v.value === result?.[item.key]}
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
