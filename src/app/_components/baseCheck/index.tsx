'use client';
import styles from './baseCheck.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EVIcon from '@/assets/icon/Type=EV.png';
import axios from 'axios';
import { debounce } from '@/app/utils';
import { CheckStatusTypes, PartKeyTypes } from '@/app/_lib/constants/types';
import { QueryResponse } from '@/app/_lib/constants/interface';
import { baseCheckList, evCheckList } from './checklist';

interface Props {
  text: string;
  reset: () => void;
}

type CheckTypes = { [key in PartKeyTypes]: CheckStatusTypes };

export default function BaseCheck({ text, reset }: Props) {
  const [result, setResult] = useState<CheckTypes>();

  useEffect(() => {
    if (
      text &&
      !text.includes('왼쪽') &&
      !text.includes('오른쪽') &&
      !text.includes('전면') &&
      !text.includes('후면') &&
      text.length > 4
    ) {
      const getTranscript = async () => {
        try {
          const { data } = await axios.post<QueryResponse>(
            'https://3598-206-219-44-244.ngrok-free.app/query',
            {
              text,
            },
          );
          if (!!data.text) {
            const newResult = {
              [data.part_key]: data.check_status,
            } as CheckTypes;
            setResult((prev) =>
              !prev ? newResult : { ...prev, ...newResult },
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

  const handleChange = ({
    key,
    status,
  }: {
    key: PartKeyTypes;
    status: CheckStatusTypes;
  }) => {
    if (result && result[key] !== undefined && result[key] === status) {
      const newState = { ...result };
      delete newState[key];

      setResult((prev) => (!prev ? prev : newState));
    } else {
      const newState = { [key]: status } as CheckTypes;
      setResult((prev) => (!prev ? newState : { ...prev, ...newState }));
    }
  };

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
                          onChange={() =>
                            handleChange({ key: item.key, status: v.value })
                          }
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
                              onChange={() =>
                                handleChange({ key: item.key, status: v.value })
                              }
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
