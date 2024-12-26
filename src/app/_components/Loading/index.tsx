import { useEffect, useState } from 'react';

interface Props {
  text?: string;
  isVisible?: boolean;
}

export default function Loading({ text = '로딩중', isVisible }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehaviorY = 'contain';
      document.documentElement.style.overscrollBehavior = 'contain';
    } else {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.overscrollBehavior = '';
    }
  }, [isVisible]);

  if (!isVisible) return;

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.3)] z-dim
    transition-opacity flex items-center justify-center overflow-auto flex-col
    ${isOpen ? 'opactiy-30' : 'opacity-0'}
  `}
    >
      <p className="text-gray12 text-heading6 mt-16">{text}</p>
    </div>
  );
}
