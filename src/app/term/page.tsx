'use client';
import ArrowLeft from '@/assets/icon/arrow-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

export default function ReadyPage() {
  const { back, push } = useRouter();

  const [loading, setLoading] = useState(false);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lottie/vehicle-loading.json',
    });

    setTimeout(() => {
      setLoading(true);
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        push('/talk');
      }, 5000);
    }
  }, [loading, push]);

  return (
    <div>
      <header className="py-16 px-20">
        <Image src={ArrowLeft} alt="left" onClick={() => back()} />
      </header>
      <div className="py-24 px-20">
        <h3 className="text-heading3 mb-32">
          진단 {loading ? '2' : '1'}개월 후<br />
          진단 정보 분석 CRM Working...
        </h3>
        <div ref={container} className="h-300" />
      </div>
    </div>
  );
}
