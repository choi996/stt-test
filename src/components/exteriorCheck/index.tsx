"use client";
import styles from "./exteriorCheck.module.css";
import Front from "../../assets/images/vehicle_front.png";
import Rear from "../../assets/images/vehicle_rear.png";
import Left from "../../assets/images/vehicle_left.png";
import Right from "../../assets/images/vehicle_right.png";
import Image from "next/image";
import { MouseEvent, useEffect } from "react";
import {
  exteriorFrontCheck,
  exteriorLeftCheck,
  exteriorRearCheck,
  exteriorRightCheck,
} from "@/app/utils";
import { bonnet } from "@/constants/strings";

interface Props {
  text: string;
  reset: () => void;
}

export default function ExteriorCheck({ text, reset }: Props) {
  useEffect(() => {
    if (text) {
      if (
        text.includes("정면") ||
        text.includes("정년") ||
        text.includes("전면") ||
        bonnet.some((v) => text.includes(v))
      ) {
        exteriorFrontCheck(text, reset);
      } else if (text.includes("후면") || text.includes("트렁크")) {
        exteriorRearCheck(text, reset);
      } else if (text.includes("왼쪽")) {
        exteriorLeftCheck(text, reset);
      } else if (text.includes("오른쪽")) {
        exteriorRightCheck(text, reset);
      }
    }
  }, [text, reset]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const borderStyle = window.getComputedStyle(target).borderStyle;
    const isInActive = borderStyle === "dotted";
    if (isInActive) {
      target.style.border = "1px solid red";
    } else {
      target.style.border = "1px dotted var(--gray-scale-2)";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <div>외관 점검</div>
        <ul>
          <li>
            <Image src={Front} width={100} alt="전면" />
            <div
              id="front_top"
              className={styles.front_top}
              onClick={handleClick}
            />
            <div
              id="front_bottom"
              className={styles.front_bottom}
              onClick={handleClick}
            />
            <div
              id="front_bonnet"
              className={styles.front_bonnet}
              onClick={handleClick}
            />
            <div
              id="front_right_headlamp"
              className={styles.front_right_headlamp}
              onClick={handleClick}
            />
            <div
              id="front_right_mirror"
              className={styles.front_right_mirror}
              onClick={handleClick}
            />
            <div
              id="front_left_headlamp"
              className={styles.front_left_headlamp}
              onClick={handleClick}
            />
            <div
              id="front_left_mirror"
              className={styles.front_left_mirror}
              onClick={handleClick}
            />
            전면
          </li>
          <li>
            <Image src={Left} width={160} alt="측면(L)" />
            <div
              id="left_front_tire"
              className={styles.left_front_tire}
              onClick={handleClick}
            />
            <div
              id="left_front_door"
              className={styles.left_front_door}
              onClick={handleClick}
            />
            <div
              id="left_rear_tire"
              className={styles.left_rear_tire}
              onClick={handleClick}
            />
            <div
              id="left_rear_door"
              className={styles.left_rear_door}
              onClick={handleClick}
            />
            측면(L)
          </li>
          <li>
            <Image src={Rear} width={100} alt="후면" />
            <div
              id="rear_top"
              className={styles.rear_top}
              onClick={handleClick}
            />
            <div
              id="rear_bottom"
              className={styles.rear_bottom}
              onClick={handleClick}
            />
            <div
              id="rear_trunk"
              className={styles.rear_trunk}
              onClick={handleClick}
            />
            <div
              id="rear_right_taillamp"
              className={styles.rear_right_taillamp}
              onClick={handleClick}
            />
            <div
              id="rear_left_taillamp"
              className={styles.rear_left_taillamp}
              onClick={handleClick}
            />
            후면
          </li>
          <li>
            <Image src={Right} width={160} alt="측면(R)" />
            <div
              id="right_front_tire"
              className={styles.right_front_tire}
              onClick={handleClick}
            />
            <div
              id="right_front_door"
              className={styles.right_front_door}
              onClick={handleClick}
            />
            <div
              id="right_rear_tire"
              className={styles.right_rear_tire}
              onClick={handleClick}
            />
            <div
              id="right_rear_door"
              className={styles.right_rear_door}
              onClick={handleClick}
            />
            측면(R)
          </li>
        </ul>
      </div>
    </div>
  );
}
