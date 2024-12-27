'use client';
import BMWIcon from '@/assets/icon/BMW.svg';
import BMWImage from '@/assets/images/BMW.png';
import Image from 'next/image';
import Tab from '../_components/Tab';
import { useRouter } from 'next/navigation';

import FrontImage from '@/assets/images/result/front.png';
import RearImage from '@/assets/images/result/rear.png';
import LefttImage from '@/assets/images/result/left.png';
import RightImage from '@/assets/images/result/right.png';
import BatteryCheckImage from '@/assets/images/result/battery-check.png';

import OkIcon from '@/assets/icon/result/ok.svg';
import WarnIcon from '@/assets/icon/result/warn.svg';
import TireIcon from '@/assets/icon/tire.svg';
import BatteryIcon from '@/assets/icon/battery.svg';
import OilIcon from '@/assets/icon/oil.svg';
import FloatBottomWrapper from '../_components/FloatBottomWrapper';
import { useHash } from '../_lib/hooks/useHash';
import { PATH } from '../_lib/router';
import { useCallback } from 'react';

export default function ResultPage() {
  const { push } = useRouter();
  const hash = useHash();

  const handleClick = useCallback(() => {
    push(PATH.CRM);
  }, [push]);

  return (
    <div>
      <header className="h-56 py-10 px-20 flex items-center gap-4">
        <Image src={BMWIcon} alt="BMW" />
        <p className="text-heading6">311가3131</p>
      </header>
      <div className="pt-12 px-20 pb-20 gap-16 flex items-center flex-col border-b-8 border-b-gray11">
        <Image src={BMWImage} alt="BMW" />
        <div className="w-full [&>div]:flex [&>div]:items-center [&>div]:justify-between">
          <div>
            <p className="text-body7_m text-gray4">차량정보</p>
            <p className="text-body7_m">3-series(F30)</p>
          </div>
          <div className="mt-20">
            <p className="text-body7_m text-gray4">진단매장</p>
            <p className="text-body7_m">스피드메이트 종로 31점</p>
          </div>
        </div>
      </div>
      <Tab
        options={[
          { label: '외관점검', value: 'exterial' },
          { label: '기본점검', value: 'basic' },
          { label: '정밀점검(진단기)', value: 'expert' },
        ]}
        activeKey={hash || 'exterial'}
      />
      {(!hash || hash === 'exterial') && (
        <ul className="pt-24 pb-120 px-20 grid gap-20">
          <li>
            <p className="text-heading7 mb-24">전면</p>
            <div className="flex items-center justify-between">
              <Image src={FrontImage} width={120} alt="front" />
              <div className="w-122 flex items-center gap-12 py-12 pr-16 pl-12 bg-gray11 rounded-lg border border-gray9">
                <Image src={OkIcon} width={20} height={20} alt="ok" />
                <p className="text-body9_m">이상없음</p>
              </div>
            </div>
          </li>
          <li>
            <p className="text-heading7 mb-24">후면</p>
            <div className="flex items-center justify-between gap-20">
              <Image src={RearImage} width={120} alt="rear" />
              <div className="w-122 flex items-center gap-12 py-12 pr-16 pl-12 bg-gray11 rounded-lg border border-gray9">
                <Image src={WarnIcon} width={20} height={20} alt="warn" />
                <p className="text-body9_m">브레이크 등 교체필요</p>
              </div>
            </div>
          </li>
          <li>
            <p className="text-heading7 mb-24">측면(Left)</p>
            <div className="flex items-center justify-between">
              <Image src={LefttImage} width={138} alt="left" />
              <div className="w-122 flex items-center gap-12 py-12 pr-16 pl-12 bg-gray11 rounded-lg border border-gray9">
                <Image src={OkIcon} width={20} height={20} alt="ok" />
                <p className="text-body9_m">이상없음</p>
              </div>
            </div>
          </li>
          <li>
            <p className="text-heading7 mb-24">측면(Right)</p>
            <div className="flex items-center justify-between gap-20">
              <Image src={RightImage} width={138} alt="right" />
              <div className="w-122 flex items-center gap-12 py-12 pr-16 pl-12 bg-gray11 rounded-lg border border-gray9">
                <Image src={WarnIcon} width={20} height={20} alt="warn" />
                <p className="text-body9_m">뒷 문짝 스크래치</p>
              </div>
            </div>
          </li>
        </ul>
      )}
      {hash === 'basic' && (
        <div>
          <section className="py-24 px-20 border-b-8 border-b-gray11">
            <p className="text-heading7 mb-24">소모품</p>
            <div className="flex items-center justify-between mb-24">
              <p className="text-body7_m text-gray4">타이어 앞바퀴</p>
              <p className="text-body7_m">235/65R16</p>
            </div>
            <div className="mb-24">
              <div className="flex items-center justify-between mb-12">
                <p className="w-100 text-center text-body9 text-gray4">좌</p>
                <div
                  className="text-body7_m text-gray12 py-4 px-12 w-full rounded-tl-2xl rounded-bl-2xl"
                  style={{
                    background:
                      'linear-gradient(90deg, #118F31 63.5%, #FFF 100%)',
                  }}
                >
                  10~13mm
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-100 text-center text-body9 text-gray4">우</p>
                <div
                  className="text-body7_m text-gray12 py-4 px-12 w-full rounded-tl-2xl rounded-bl-2xl"
                  style={{
                    background:
                      'linear-gradient(90deg, #118F31 63.5%, #FFF 100%)',
                  }}
                >
                  10~13mm
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-24">
              <p className="text-body7_m text-gray4">타이어 뒷바퀴</p>
              <p className="text-body7_m">245/45R19</p>
            </div>
            <div className="mb-24">
              <div className="flex items-center justify-between mb-12">
                <p className="w-100 text-center text-body9 text-gray4">좌</p>
                <div
                  className="text-body7_m text-gray12 py-4 px-12 w-full rounded-tl-2xl rounded-bl-2xl"
                  style={{
                    background:
                      'linear-gradient(90deg, #FF7A27 57%, #FFF 77.5%)',
                  }}
                >
                  5~7mm
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-100 text-center text-body9 text-gray4">우</p>
                <div
                  className="text-body7_m text-gray12 py-4 px-12 w-full rounded-tl-2xl rounded-bl-2xl"
                  style={{
                    background:
                      'linear-gradient(90deg, #DF0E36 25.5%, #FFF 48%)',
                  }}
                >
                  0~2mm
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 py-12 px-12 rounded-lg border border-gray9 bg-gray11">
              <Image src={TireIcon} width={20} height={20} alt="tire" />
              <p className="text-heading8">뒷바퀴 오른쪽 교체 요망</p>
            </div>

            <div className="flex items-center gap-4 mt-24">
              <Image src={WarnIcon} width={16} height={16} alt="warn" />
              <p className="text-body9">
                타이어는 <b>5만km, 3년마다</b> 교체를 권장해요
              </p>
            </div>
          </section>
          <section className="py-24 px-20 border-b-8 border-b-gray11">
            <div className="flex items-center justify-between mb-24">
              <p className="text-body8_m">배터리</p>
              <p className="text-body8_m">DF80L</p>
            </div>
            <Image src={BatteryCheckImage} alt="battery-check" />
            <div className="flex items-center gap-6 py-12 px-12 rounded-lg border border-gray9 bg-gray11 mt-24">
              <Image src={BatteryIcon} width={20} height={20} alt="battery" />
              <p className="text-heading8">이상없음</p>
            </div>
            <div className="flex items-center gap-4 mt-24">
              <Image src={WarnIcon} width={16} height={16} alt="warn" />
              <p className="text-body9">
                배터리는 <b>5만km, 3년마다</b> 교체를 권장해요
              </p>
            </div>
          </section>
          <section className="py-24 pb-120 px-20">
            <div className="flex items-center justify-between mb-24">
              <p className="text-body8_m">엔진오일</p>
              <p className="text-body8_m">5W-30/ACEA A3</p>
            </div>
            <div className="flex items-center justify-between mb-12 gap-12">
              <p className="w-100 text-center text-body9 text-gray4">
                교체 후 경과
              </p>
              <div
                className="text-body7_m text-gray12 py-4 px-12 w-full rounded-tl-2xl rounded-bl-2xl"
                style={{
                  background: 'linear-gradient(90deg, #DF0E36 25.5%, #FFF 48%)',
                }}
              >
                9개월
              </div>
            </div>
            <div className="flex items-center gap-6 py-12 px-12 rounded-lg border border-gray9 bg-gray11 mt-24">
              <Image src={OilIcon} width={20} height={20} alt="oil" />
              <p className="text-heading8">3개월 후 교체요망</p>
            </div>
            <div className="flex items-center gap-4 mt-24">
              <Image src={WarnIcon} width={16} height={16} alt="warn" />
              <p className="text-body9">
                엔진오일은 <b>1만km, 1년마다</b> 교체를 권장해요
              </p>
            </div>
          </section>
        </div>
      )}
      <FloatBottomWrapper label="확인 완료" onClick={handleClick} />
    </div>
  );
}
