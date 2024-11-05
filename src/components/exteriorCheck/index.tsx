"use client";
import styles from "./exteriorCheck.module.css";
import Front from "../../assets/images/vehicle_front.png";
import Rear from "../../assets/images/vehicle_rear.png";
import Left from "../../assets/images/vehicle_left.png";
import Right from "../../assets/images/vehicle_right.png";
import Image from "next/image";
import { useEffect } from "react";
import {
  exteriorFrontCheck,
  exteriorLeftCheck,
  exteriorRearCheck,
  exteriorRightCheck,
} from "@/app/utils";

interface Props {
  text: string;
  reset: () => void;
}

export default function ExteriorCheck({ text, reset }: Props) {
  useEffect(() => {
    if (text) {
      if (text.includes("전면")) {
        exteriorFrontCheck(text, reset);
      } else if (text.includes("후면")) {
        exteriorRearCheck(text, reset);
      } else if (text.includes("왼쪽")) {
        exteriorLeftCheck(text, reset);
      } else if (text.includes("오른쪽")) {
        exteriorRightCheck(text, reset);
      }
    }
  }, [text, reset]);

  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <div>외관 점검</div>
        <ul>
          <li id="front_side">
            <Image src={Front} width={100} alt="전면" />
            전면
          </li>
          <li id="left_side">
            <Image src={Left} width={160} alt="측면(L)" />
            측면(L)
          </li>
          <li id="rear_side">
            <Image src={Rear} width={100} alt="후면" />
            후면
          </li>
          <li id="right_side">
            <Image src={Right} width={160} alt="측면(R)" />
            측면(R)
          </li>
        </ul>
      </div>
    </div>
  );
}
