'use client';

import { ChangeEvent, useState } from 'react';
import { clearBlank } from '@/app/_lib/utils';
import { regex } from '@/app/_lib/constants/strings';

interface VehicleInfo {
  vehicleType: string;
  vehicleNumber: string;
  distance: number;
}

export default function VehicleInfo() {
  const [type, setType] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [distance, setDistance] = useState('');

  const [carNumberError, setCarNumberError] = useState(false);

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setType(value);
  };

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const clear = clearBlank(value);

    console.log(clear, regex.carNumber.test(clear));

    setCarNumberError(!!clear && !regex.carNumber.test(clear));

    setCarNumber(clear);
  };

  const handleChangeDistance = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const removeComma = value.replaceAll(',', '');
    if (!!removeComma && !removeComma.match(/^[0-9]+$/)) {
      return;
    }

    setDistance(!removeComma ? '' : Number(removeComma).toLocaleString());
  };

  return (
    <div className="pt-16 px-20 pb-8">
      <ul
        className="border border-solid border-gray2 md:flex rounded-lg
          [&>li]:flex [&>li]:items-center [&>li]:gap-12 [&>li]:relative 
          [&>li>p]:py-12 [&>li>p]:px-20 [&>li>p]:min-w-96 [&>li>p]:bg-gray11 [&>li>p]:text-center [&>li>p]:text-heading8
          [&>li>input]:mr-36 [&>li>input]:text-right"
      >
        <li className="border-b border-dotted md:border-none">
          <p className="rounded-tl-lg md:rounded-bl-lg">차종</p>
          <input value={type} onChange={handleChangeType} />
        </li>
        <li className="border-b border-dotted md:border-none">
          <p>차량번호</p>
          <input value={carNumber} onChange={handleChangeNumber} />
          {carNumberError && (
            <span className="absolute bottom-0 right-16 text-body11 text-systemRed2">
              차량번호를 확인해주세요
            </span>
          )}
        </li>
        <li>
          <p className="rounded-bl-lg md:rounded-bl-none">주행거리</p>
          <input value={distance} onChange={handleChangeDistance} />
          <span className="absolute top-14 right-12 text-body7">km</span>
        </li>
      </ul>
    </div>
  );
}