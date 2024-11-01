import dayjs from "dayjs";
import styles from "./date.module.css";

export default function Date() {
  return (
    <div className={styles.container}>
      날짜: {dayjs().format("YYYY년 MM월 DD일 HH시 mm분")}
    </div>
  );
}
