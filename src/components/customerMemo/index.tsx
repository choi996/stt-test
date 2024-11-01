"use client";
import styles from "./customerMemo.module.css";

export default function CustomerMemo() {
  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <p>
          고 객<br />요 청<br />사 항
        </p>
        <textarea />
        <div>
          <p>점검 담당자</p>
          <div>
            <input placeholder="Signature" />
          </div>
        </div>
      </div>
      <div className={styles.check_mamager}>
        <span>* 점검 담당자:</span> <input placeholder="Signature" />
      </div>
    </div>
  );
}
