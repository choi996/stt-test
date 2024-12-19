import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from 'react';

type ButtonSize = 56 | 48 | 44 | 40 | 36 | 32;

export type ButtonProps = {
  label: string;
  isFull?: boolean;
  isGhost?: boolean;
  color?: 'primary' | 'gray';
  size?: ButtonSize;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  isFull = true,
  isGhost,
  color = 'primary',
  label,
  size = 56,
  ...rest
}: ButtonProps) {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 48:
        return 'py-12 px-20 text-button2 h-48';
      case 44:
        return 'p-12 text-button3 h-44';
      case 40:
        return 'py-10 px-12 text-button3 h-40';
      case 36:
        return 'py-8 px-12 text-button2 h-36';
      case 32:
        return 'py-7 px-10 text-button4 h-32';
      default:
        return 'py-16 px-12 text-button2 h-56';
    }
  }, []);

  const colorClasses = useMemo(() => {
    switch (color) {
      case 'primary':
        if (isGhost) {
          return 'bg-gray12 border border-primary1 text-primary1';
        } else {
          return 'bg-primary1 border-none text-gray12';
        }
      case 'gray':
        if (isGhost) {
          return 'bg-gray12 text-gray2 border border-gray-9';
        } else {
          return 'bg-gray10 border-none text-gray2';
        }
    }
  }, []);

  return (
    <button
      className={`${sizeClasses} ${colorClasses} rounded-lg transition-colors duration-300 
    disabled:bg-gray7 disabled:text-gray12 ${isFull ? 'w-full' : 'w-fit'}`}
      {...rest}
    >
      {label}
    </button>
  );
}
