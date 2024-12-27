'use client';

import FloatBottomWrapper from '@/app/_components/FloatBottomWrapper';
import { PATH } from '@/app/_lib/router';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function HistoryPageBottomButton() {
  const { push } = useRouter();

  const handleClick = useCallback(() => {
    push(PATH.INSPECT);
  }, [push]);

  return <FloatBottomWrapper label="진단 시작" onClick={handleClick} />;
}
