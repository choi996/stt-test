import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./input.module.css";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: Props) {
  return <input className={styles.container} {...props} />;
}
