'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import ArrowIcon from '@/assets/icon/arrow-bold-down.svg';
import Image from 'next/image';

interface Props extends PropsWithChildren {
  defaultValue?: boolean;
  title: string;
}

export default function Accordion({
  defaultValue = false,
  title,
  children,
}: Props) {
  const [isExpand, setIsExpand] = useState(defaultValue);

  useEffect(() => {
    setIsExpand(defaultValue);
  }, [defaultValue]);

  const handleClick = () => {
    setIsExpand((prev) => !prev);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between py-12 px-20 border-b border-gray9"
        onClick={handleClick}
      >
        <h3 className="text-heading5">{title}</h3>
        <Image
          className={`${isExpand ? ' rotate-180' : ''}`}
          src={ArrowIcon}
          alt="arrow"
        />
      </div>
      {isExpand && <div className="mt-20">{children}</div>}
    </div>
  );
}
