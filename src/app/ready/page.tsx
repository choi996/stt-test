'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Header from '../_components/Header';
import { PATH } from '../_lib/router';

export default function ReadyPage() {
  const { push } = useRouter();

  const container = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lottie/vehicle-loading.json',
    });

    timer.current = setTimeout(() => {
      push(PATH.RESULT);
    }, 5000);

    return () => clearTimeout(timer.current as NodeJS.Timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div className="py-24 px-20">
        <h3 className="text-heading3 mb-32">진단정보 분석중...</h3>
        <div ref={container} className="h-300" />
      </div>
    </div>
  );
}
