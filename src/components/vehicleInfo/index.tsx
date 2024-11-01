"use client";

import { ChangeEvent, useState } from "react";
import styles from "./vehicleInfo.module.css";

interface VehicleInfo {
  vehicleType: string;
  vehicleNumber: string;
  distance: number;
}

export default function VehicleInfo() {
  const [distance, setDistance] = useState<string>("");

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const removeComma = value.replaceAll(",", "");
    if (!!removeComma && !removeComma.match(/^[0-9]+$/)) {
      return;
    }

    setDistance(!removeComma ? "" : Number(removeComma).toLocaleString());
  };

  return (
    <div className={styles.container}>
      <ul className={styles.card_wrapper}>
        <li>
          <p>차종</p>
          <input />
        </li>
        <li>
          <p>차량번호</p>
          <input />
        </li>
        <li>
          <p>주행거리</p>
          <input value={distance} onChange={handleDistanceChange} />
          <span>km</span>
        </li>
      </ul>
    </div>
  );
}
