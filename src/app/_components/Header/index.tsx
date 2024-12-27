'use client';

import Image from 'next/image';
import ArrowLeft from '@/assets/icon/arrow-left.svg';
import { memo } from 'react';
import { useRouter } from 'next/navigation';

interface Prpos {
  title?: string;
}

export default memo(function Header({ title = '' }: Prpos) {
  const { back } = useRouter();

  const handlePrev = () => back();

  return (
    <header className="flex items-center justify-between py-16 px-20">
      <Image src={ArrowLeft} alt="left" onClick={handlePrev} />
      <p className="text-heading7">{title}</p>
      <div className="w-24" />
    </header>
  );
});
