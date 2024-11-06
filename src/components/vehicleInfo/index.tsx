"use client";

import { ChangeEvent, useState } from "react";
import styles from "./vehicleInfo.module.css";
import axios from "axios";

interface VehicleInfo {
  vehicleType: string;
  vehicleNumber: string;
  distance: number;
}

export default function VehicleInfo() {
  const [distance, setDistance] = useState<string>("");

  const [carNumber, setCarNumber] = useState<string>("");

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const removeComma = value.replaceAll(",", "");
    if (!!removeComma && !removeComma.match(/^[0-9]+$/)) {
      return;
    }

    setDistance(!removeComma ? "" : Number(removeComma).toLocaleString());
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const axiosInstance = axios.create({
        baseURL: "https://a4f0-206-219-44-244.ngrok-free.app",
      });
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
        const { data } = await axiosInstance.post("/ocr", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 업로드에 필요한 헤더 설정
          },
        });

        console.log(data);
        if (data.carNumber.match(/^([가-힣]{2})?\d{2,3}[가-힣]\s?\d{4}$/)) {
          setCarNumber(data.carNumber);
        } else {
          alert("차량번호 인식 실패");
        }
      } catch (error) {
        console.log(error);
        alert("차량번호 인식 실패");
      }
    }
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
          <label htmlFor="carNumber"></label>
          <input
            id="carNumber"
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          {!!carNumber && <div className={styles.car_number}>{carNumber}</div>}
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
