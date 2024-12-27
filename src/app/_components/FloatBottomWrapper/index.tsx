import { memo } from 'react';
import Button, { ButtonProps } from '../Button';

type FloatButtonWrapper = Pick<
  ButtonProps,
  'label' | 'type' | 'disabled' | 'onClick'
>;

export default memo(function FloatBottomWrapper(props: FloatButtonWrapper) {
  return (
    <div className="fixed bottom-0 pt-16 pr-20 pb-24 pl-20 bg-gray12 w-full max-w-1024">
      <Button isFull {...props} />
    </div>
  );
});
