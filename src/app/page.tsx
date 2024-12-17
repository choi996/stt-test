"use client";
import { useRouter } from "next/navigation";
import "regenerator-runtime/runtime";
import styles from "./page.module.css";
import MainImage from "@/assets/images/main.png";
import SpeedmateLogoImage from "@/assets/images/speedmate.png";
import Image from "next/image";
import Input from "@/components/input";
import FloatBottomWrapper from "@/components/floatBottomWrapper";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export default function Home() {
  const { push } = useRouter();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const clearBlank = (s: string) => s.replace(/ /g, "");

  const handleChangeCode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCode(clearBlank(value));
  }, []);

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setPassword(clearBlank(value));
    },
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push("/inspect");
  };

  return (
    <div className={styles.page}>
      <div className={styles.main_img_wrapper}>
        <Image
          src={MainImage}
          priority
          alt="main"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>
          <b>Speedmate Check-Mate</b>
          <p>Trust your car to the experts</p>
        </div>
        <div className={styles.speedmate}>
          <Image
            src={SpeedmateLogoImage}
            alt="speedmate"
            width={111}
            height={18}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.body_wrapper}>
          <div className={styles.input_wrapper}>
            <Input
              name="code"
              placeholder="매장코드 입력 (cf.S001, F001)"
              autoComplete="username"
              value={code}
              onChange={handleChangeCode}
            />
            <Input
              placeholder="비밀번호 입력 (웹포스 접속 비밀번호)"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
        </div>
        <FloatBottomWrapper label="로그인" disabled={!code || !password} />
      </form>
    </div>
  );
}
