import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./button.module.css";
import classNames from "classnames";

export type ButtonProps = {
  label: string;
  isFull?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ isFull = true, label, ...rest }: ButtonProps) {
  const classes = classNames(styles.container, { [styles.isFull]: isFull });

  return (
    <button className={classes} {...rest}>
      {label}
    </button>
  );
}
