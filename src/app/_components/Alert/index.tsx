import { MouseEvent, PropsWithChildren, useEffect, useState } from 'react';
import Button from '../Button';

interface Props extends PropsWithChildren {
  title: string;
  isVisible?: boolean;
  onClose: () => void;
  primaryText?: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function Alert({
  title,
  isVisible,
  onClose,
  primaryText = '확인',
  secondaryText = '닫기',
  onPrimaryClick,
  onSecondaryClick,
  children,
}: Props) {
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

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  if (!isVisible) return;

  return (
    <>
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.3)] z-dim
        transition-opacity flex items-center justify-center overflow-auto
        ${isOpen ? 'opactiy-30' : 'opacity-0'}
      `}
        onClick={handleClose}
      />
      <div
        className={`w-[calc(100%-40px)] bg-gray12 py-24 px-12 rounded-xl z-alert 
          fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
          `}
      >
        <div className="text-center whitespace-pre-line mb-24 text-heading7">
          {title}
        </div>
        <div>{children}</div>
        {(!!onPrimaryClick || !!onSecondaryClick) && (
          <div className="flex gap-8 mt-16 w-full">
            {!!onSecondaryClick && (
              <Button
                onClick={onSecondaryClick}
                label={secondaryText}
                color="gray"
                isGhost
                size={44}
              />
            )}
            {!!onPrimaryClick && (
              <Button onClick={onPrimaryClick} label={primaryText} size={44} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
