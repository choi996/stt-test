import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useHash = () => {
  const params = useParams();

  const [hash, setHash] = useState('');

  useEffect(() => {
    if (window.location.hash) {
      setHash(window.location.hash.replace('#', ''));
    }
  }, [params]);

  return hash;
};
