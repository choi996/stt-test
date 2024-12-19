import { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default memo(
  function Input(props: Props) {
    return (
      <input
        className="py-6 px-12 rounded-lg border border-solid border-gray7 text-body7 placeholder:text-gray6"
        {...props}
      />
    );
  },
  (prev, next) => prev.value === next.value,
);
