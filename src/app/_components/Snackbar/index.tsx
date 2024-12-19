import ErrorIcon from '@/assets/icon/error.svg';
import SuccessIcon from '@/assets/icon/success.svg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  status: 'success' | 'error';
  isVisible: boolean;
}

export default function Snackbar({
  isVisible,
  text,
  status = 'success',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const icon = status === 'success' ? SuccessIcon : ErrorIcon;

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } else {
      setIsOpen(false);
    }
  }, [isVisible]);

  if (!isOpen) return;

  return (
    <div
      className={`animate-notification transicion-opacity fixed ml-20 bottom-100 w-[calc(100%-40px)] max-w-984 flex items-center gap-4 bg-[rgba(40,42,46,0.8)] py-12 px-24 rounded-3xl`}
    >
      <Image src={icon} alt={status} />
      <p className="text-body8_m text-gray12 whitespace-pre-line">{text}</p>
    </div>
  );
}
