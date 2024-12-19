'use client';
import BMWIcon from '@/assets/icon/BMW.svg';
import BMWImage from '@/assets/images/BMW.png';
import Image from 'next/image';
import Tab from '../_components/Tab';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import FrontImage from '@/assets/images/result/front.png';
import RearImage from '@/assets/images/result/rear.png';
import LefttImage from '@/assets/images/result/left.png';
import RightImage from '@/assets/images/result/right.png';

import OkIcon from '@/assets/icon/result/ok.svg';
import WarnIcon from '@/assets/icon/result/warn.svg';

export default function ResultPage() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');

  const handleChangeTab = (type: string) => {
    push(`${pathname}?tab=${type}`);
  };

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
        activeKey={tab || 'exterial'}
        onChange={handleChangeTab}
      />
      {(!tab || tab === 'exterial') && (
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
    </div>
  );
}
