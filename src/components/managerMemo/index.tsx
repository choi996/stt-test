"use client";
import styles from "./managerMemo.module.css";

export default function ManagerMemo() {
  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <p>종합 의견</p>
        <textarea />
      </div>
    </div>
  );
}
