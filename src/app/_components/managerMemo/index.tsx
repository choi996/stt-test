"use client";
import styles from "./managerMemo.module.css";

export default function ManagerMemo() {
  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <div>종합 의견</div>
        <textarea />
      </div>
    </div>
  );
}
