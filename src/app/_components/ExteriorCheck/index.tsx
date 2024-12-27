'use client';
import Front from '@/assets/images/vehicle_front.png';
import Rear from '@/assets/images/vehicle_rear.png';
import Left from '@/assets/images/vehicle_left.png';
import Right from '@/assets/images/vehicle_right.png';
import Image from 'next/image';
import { MouseEvent, useEffect } from 'react';

import { bonnet } from '@/app/_lib/constants/strings';
import {
  exteriorFrontCheck,
  exteriorLeftCheck,
  exteriorRearCheck,
  exteriorRightCheck,
} from '@/app/_lib/utils/exterior';

interface Props {
  text: string;
  reset: () => void;
}

export default function ExteriorCheck({ text, reset }: Props) {
  useEffect(() => {
    if (text) {
      if (
        text.includes('정면') ||
        text.includes('정년') ||
        text.includes('전면') ||
        text.includes('헤드') ||
        bonnet.some((v) => text.includes(v))
      ) {
        exteriorFrontCheck(text, reset);
      } else if (
        text.includes('후면') ||
        text.includes('트렁크') ||
        text.includes('테일') ||
        text.includes('후미')
      ) {
        exteriorRearCheck(text, reset);
      } else if (text.includes('왼쪽')) {
        exteriorLeftCheck(text, reset);
      } else if (text.includes('오른쪽')) {
        exteriorRightCheck(text, reset);
      }
    }
  }, [text, reset]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const borderStyle = window.getComputedStyle(target).borderStyle;
    const isInActive = borderStyle === 'dotted';
    if (isInActive) {
      target.style.border = '1px solid red';
    } else {
      target.style.border = '1px dotted #282A2E';
    }
  };

  return (
    <div className="pt-0 px-20 pb-8">
      <div className="border border-solid border-gray2 rounded-lg">
        <div
          className="text-center bg-gray11 rounded-tl-lg rounded-tr-lg 
              py-12 px-20 text-heading8 border-b border-solid border-gray7"
        >
          외관 점검
        </div>
        <ul
          className="grid place-items-center p-12 grid-cols-1 min-[340px]:grid-cols-2 md:grid-cols-4
          [&>li]:grid [&>li]:place-items-center [&>li]:relative [&>li]:w-fit [&>li]:text-body7
          [&>li>div]:absolute [&>li>div]:border [&>li>div]:border-dotted [&>li>div]:border-gray2
          "
        >
          <li>
            <Image src={Front} width={100} alt="전면" />
            <div
              id="front_top"
              className="top-4 h-10 w-60 rounded-lg"
              onClick={handleClick}
            />
            <div
              id="front_bottom"
              className="top-50 h-10 w-90 rounded-lg"
              onClick={handleClick}
            />
            <div
              id="front_bonnet"
              className="top-24 h-16 w-36 rounded-lg"
              onClick={handleClick}
            />
            <div
              id="front_right_headlamp"
              className="top-30 left-10 h-20 w-20 rounded-full"
              onClick={handleClick}
            />
            <div
              id="front_right_mirror"
              className="top-18 left-0 h-16 w-16 rounded-full"
              onClick={handleClick}
            />
            <div
              id="front_left_headlamp"
              className="top-30 right-12 h-20 w-20 rounded-full"
              onClick={handleClick}
            />
            <div
              id="front_left_mirror"
              className="top-18 right-4 h-16 w-16 rounded-full"
              onClick={handleClick}
            />
            전면
          </li>
          <li>
            <Image
              src={Left}
              width={160}
              height={56}
              style={{ minWidth: 160, minHeight: 56 }}
              alt="측면(L)"
            />
            <div
              id="left_front_tire"
              className="top-32 left-20 h-25 w-25 rounded-full"
              onClick={handleClick}
            />
            <div
              id="left_front_door"
              className="top-20 left-60 h-20 w-20 rounded-full"
              onClick={handleClick}
            />
            <div
              id="left_rear_tire"
              className="top-32 right-26 h-25 w-25 rounded-full"
              onClick={handleClick}
            />
            <div
              id="left_rear_door"
              className="top-20 right-50 h-20 w-20 rounded-full"
              onClick={handleClick}
            />
            측면(L)
          </li>
          <li>
            <Image src={Rear} width={100} alt="후면" />
            <div
              id="rear_top"
              className="top-10 h-10 w-60 rounded-lg"
              onClick={handleClick}
            />
            <div
              id="rear_bottom"
              className="top-50 h-10 w-90 rounded-lg"
              onClick={handleClick}
            />
            <div
              id="rear_trunk"
              className="top-30 h-14 left-31 w-36 rounded-lg"
              onClick={handleClick}
            />
            <div
              id="rear_right_taillamp"
              className="top-30 right-16 h-18 w-18 rounded-full"
              onClick={handleClick}
            />
            <div
              id="rear_left_taillamp"
              className="top-30 left-14 h-18 w-18 rounded-full"
              onClick={handleClick}
            />
            후면
          </li>
          <li>
            <Image
              src={Right}
              width={160}
              height={56}
              style={{ minWidth: 160, minHeight: 56 }}
              alt="측면(R)"
            />
            <div
              id="right_front_tire"
              className="top-30 right-19 h-25 w-25 rounded-full"
              onClick={handleClick}
            />
            <div
              id="right_front_door"
              className="top-20 right-60 h-20 w-20 rounded-full"
              onClick={handleClick}
            />
            <div
              id="right_rear_tire"
              className="top-30 left-26 h-25 w-25 rounded-full"
              onClick={handleClick}
            />
            <div
              id="right_rear_door"
              className="top-20 left-50 h-20 w-20 rounded-full"
              onClick={handleClick}
            />
            측면(R)
          </li>
        </ul>
      </div>
    </div>
  );
}
