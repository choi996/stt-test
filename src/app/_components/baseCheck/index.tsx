'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EVIcon from '@/assets/icon/Type=EV.png';
import axios from 'axios';
import { debounce } from '@/app/utils';
import { CheckStatusTypes, PartKeyTypes } from '@/app/_lib/constants/types';
import { QueryResponse } from '@/app/_lib/constants/interface';
import { baseCheckList, evCheckList } from './checklist';
import FloatBottomWrapper from '../FloatBottomWrapper';

interface Props {
  text: string;
  reset: () => void;
}

type CheckTypes = { [key in PartKeyTypes]: CheckStatusTypes };

export default function BaseCheck({ text, reset }: Props) {
  const [result, setResult] = useState<CheckTypes>();
  const [oilMemo, setOilMemo] = useState('');
  const [oilFocus, setOilFocus] = useState(false);

  useEffect(() => {
    if (
      (text.includes('엔진') || text.includes('오일')) &&
      text.includes('메모')
    ) {
      reset();
      setOilFocus(true);
      const oil_textarea = document.getElementById('engine_oil');

      oil_textarea?.focus();
      return;
    }

    if (text && oilFocus) {
      if (text.includes('완료')) {
        setOilFocus(false);
        const oil_textarea = document.getElementById('engine_oil');

        oil_textarea?.blur();
      }
      setOilMemo(text.replace('완료', ''));

      return;
    }

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
    <div className="px-20 pb-8">
      <div className="rounded-lg">
        <div className="border border-solid border-gray2 text-center bg-gray11 rounded-tl-lg rounded-tr-lg py-12 px-20 text-heading8 border-b border-b-gray7">
          기본 점검
        </div>
        <ul className="block place-items-center grid-col-1 min-[272px]:grid min-[480px]:grid-cols-2 min-[720px]:grid-cols-3">
          {baseCheckList.map((item) => (
            <li
              className="flex flex-col gap-12 w-full h-full p-12 grid-cols-[22%_72%] overflow-x-auto
              min-[272px]:grid 
              border-b border-r border-solid border-gray7
              max-[479px]:border-r-gray2 max-[479px]:border-l-gray2 max-[479px]:border-l
              [&:nth-of-type(2n+1)]:max-[719px]:border-l-gray2 [&:nth-of-type(2n+1)]:max-[719px]:border-l 
              [&:nth-of-type(3n+1)]:min-[720px]:border-l [&:nth-of-type(3n+1)]:border-l-gray2
              [&:nth-of-type(3n+3)]:border-r [&:nth-of-type(3n+3)]:border-l-gray2 [&:nth-of-type(3n+3)]:min-[720px]:border-l-none
              [&:nth-of-type(3n+3)]:min-[720px]:border-l-gray7
              [&:nth-of-type(3n+3)]:min-[720px]:border-r [&:nth-of-type(3n+3)]:min-[720px]:border-r-gray2
              [&:nth-of-type(2n+2)]:border-l-none [&:nth-of-type(2n+2)]:min-[720px]:border-r [&:nth-of-type(2n+2):max-[719px]:border-r-gray7 [&:nth-of-type(2n+2):max-[479px]:border-r-gray2
              [&:nth-of-type(2n+2)]:min-[479px]:max-[719px]:border-r-gray2
              [&:nth-last-of-type(-n+3):nth-of-type(3n)]:border-b [&:nth-last-of-type(-n+3):nth-of-type(3n)]:border-b-gray7 [&:nth-last-of-type(-n+3):nth-of-type(3n)]:min-[720px]:border-b-gray2
              [&:last-of-type]:border-b [&:last-of-type]:border-r [&:last-of-type]:border-gray2 [&:last-of-type]:rounded-br-lg [&:last-of-type]:max-[479px]:rounded-bl-lg
              [&:nth-last-of-type(2)]:min-[480px]:border-b-gray2 [&:nth-last-of-type(2)]:min-[480px]:rounded-bl-lg
              "
              key={item.title}
            >
              <div className="grid place-items-center gap-4">
                {item.icon && (
                  <Image src={item.icon} alt={item.title} width={40} />
                )}
                <p className="text-body9_m text-center text-ellipsis">
                  {item.title}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-8 max-[272px]:justify-center">
                  {item.checkList.map((v) => {
                    const type = item.title + v.label;
                    return (
                      <div key={v.label} className="flex items-center gap-4">
                        <input
                          className="shrink-0 w-fit"
                          type="checkbox"
                          id={type}
                          name={type}
                          checked={v.value === result?.[item.key]}
                          onChange={() =>
                            handleChange({ key: item.key, status: v.value })
                          }
                        />
                        <label className="text-body9" htmlFor={type}>
                          {v.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <textarea
                  id={item.key}
                  className="bg-gray11 rounded-lg mt-12 w-full text-body8"
                  value={item.key === 'engine_oil' ? oilMemo : ''}
                  onChange={({ target: { value } }) =>
                    item.key === 'engine_oil' ? setOilMemo(value) : undefined
                  }
                  onBlur={() => {
                    reset();
                    setOilFocus(false);
                  }}
                />
              </div>
            </li>
          ))}
          <div
            key="ev"
            className="pt-4 pl-4 max-[719px]:col-span-full max-[719px]:p-0 max-[719px]:mt-8 w-full h-full "
          >
            <div className="grid gap-12 w-full h-full p-8 grid-cols-[22%_72%] border border-gray2 max-[719px]:rounded-lg min-[720px]:rounded-br-lg">
              <div className="grid place-items-center gap-4">
                <Image src={EVIcon} alt="EV" width={40} />
                <p>xEV</p>
              </div>
              <ul className="w-full [&>li:not(:last-of-type)]:pb-4 [&>li:not(:last-of-type)]:mb-4 [&>li:not(:last-of-type)]:border-b [&>li:not(:last-of-type)]:border-gray7">
                {evCheckList.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center justify-between"
                  >
                    <p className="text-body9_m">{item.title}</p>
                    <div className="flex items-center gap-8">
                      {item.checkList.map((v) => {
                        const type = item.title + v.label;
                        return (
                          <div
                            key={v.label}
                            className="flex items-center gap-4"
                          >
                            <input
                              type="checkbox"
                              id={type}
                              name={type}
                              checked={v.value === result?.[item.key]}
                              onChange={() =>
                                handleChange({ key: item.key, status: v.value })
                              }
                            />
                            <label htmlFor={type} className="text-body9">
                              {v.label}
                            </label>
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
