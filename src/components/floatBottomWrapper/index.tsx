import Button, { ButtonProps } from "../button";
import styles from "./floatBottomWrapper.module.css";

type FloatButtonWrapper = Pick<
  ButtonProps,
  "label" | "isFull" | "type" | "disabled" | "onClick"
>;

export default function FloatBottomWrapper(props: FloatButtonWrapper) {
  return (
    <div className={styles.container}>
      <Button {...props} />
    </div>
  );
}
