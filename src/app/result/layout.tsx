import { Suspense } from 'react';
import ResultPage from './page';

export default function ResultLayout() {
  return (
    <Suspense>
      <ResultPage />
    </Suspense>
  );
}
