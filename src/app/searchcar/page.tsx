'use client';

import ArrowLeft from '@/assets/icon/arrow-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { clearBlank } from '../_lib/utils';
import { regex } from '../_lib/constants/strings';
import FloatBottomWrapper2 from '../_components/FloatBottomWrapper2';
import Snackbar from '../_components/Snackbar';

export default function SearchCarPage() {
  const { back, push } = useRouter();

  const [carNumber, setCarNumber] = useState('');
  const [carNumberError, setCarNumberError] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const handleChangeCarNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const clear = clearBlank(value);
    setCarNumberError(!!clear && !regex.carNumber.test(clear));
    setCarNumber(clear);
  };

  return (
    <div>
      <header className="py-16 px-20">
        <Image src={ArrowLeft} alt="left" onClick={() => back()} />
      </header>

      <div className="py-24 px-20">
        <h3 className="text-heading3 mb-32">
          진단할 고객 차량 번호를
          <br />
          입력해 주세요.
        </h3>
        <div>
          <label htmlFor="carNumber" className="text-body7 text-gray5">
            차량번호
          </label>
          <input
            id="carNumber"
            className="mt-4 text-body2_m [&:placeholder]:text-gray6 border-b border-b-primary1"
            value={carNumber}
            placeholder="차량번호 입력"
            onChange={handleChangeCarNumber}
          />
        </div>
        {carNumberError && (
          <p className="text-body10 text-systemRed3 mt-4">
            차량번호를 확인해주세요.
          </p>
        )}
      </div>
      <Snackbar
        isVisible={isVisible}
        text={
          carNumber === '311가3131'
            ? '차량조회가 완료 되었어요.'
            : '입력한 차량번호가 조회되지 않아요.\n정비회원 가입 차량인지 확인해 주세요.'
        }
        status={carNumber === '311가3131' ? 'success' : 'error'}
      />
      <FloatBottomWrapper2
        label="조회하기"
        disabled={carNumberError || !carNumber}
        onClick={() => {
          setIsVisible(true);

          setTimeout(() => {
            if (carNumber === '311가3131') {
              push('/inspect');
            } else {
              setIsVisible(false);
            }
          }, 3000);
        }}
      />
    </div>
  );
}