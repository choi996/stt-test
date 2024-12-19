'use client';

import Image from 'next/image';
import TalkImage from '@/assets/images/result/alarm.png';
import ArrowLeft from '@/assets/icon/arrow-left.svg';
import { useRouter } from 'next/navigation';

export default function TalkPage() {
  const { back } = useRouter();
  return (
    <div>
      <header className="py-16 px-20">
        <Image src={ArrowLeft} alt="left" onClick={() => back()} />
      </header>
      <Image src={TalkImage} alt="알림톡" />
    </div>
  );
}
