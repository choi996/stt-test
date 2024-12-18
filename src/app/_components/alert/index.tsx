import { MouseEvent, PropsWithChildren, useEffect } from "react";
import styles from "./alert.module.css";

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
  primaryText = "확인",
  secondaryText = "닫기",
  onPrimaryClick,
  onSecondaryClick,
  children,
}: Props) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehaviorY = "contain";
      document.documentElement.style.overscrollBehavior = "contain";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overscrollBehavior = "";
    }
  }, [isVisible]);

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  if (!isVisible) return;

  return (
    <>
      <div className={styles.alert_overlay} onClick={handleClose} />
      <div className={styles.alert_wrapper}>
        <div className={styles.title}>{title}</div>
        <div>{children}</div>
        {(!!onPrimaryClick || !!onSecondaryClick) && (
          <div className={styles.button_wrapper}>
            {!!onSecondaryClick && (
              <button className={styles.secondary} onClick={onSecondaryClick}>
                {secondaryText}
              </button>
            )}
            {!!onPrimaryClick && (
              <button className={styles.primary} onClick={onPrimaryClick}>
                {primaryText}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
