import Image from 'next/image';
import Header from '../_components/Header';
import HistoryPageBottomButton from './_components/BottomButton';
import BMWIcon from '@/assets/icon/BMW.svg';
import RepairCard from './_components/RepairCard';

const dummy = [
  {
    createdAt: '2024.12.24',
    repairShopName: '왕십리 역사',
    managerName: '홍길동',
    list: [
      '엔진오일 교환',
      '앞 와이퍼 플레이드 교환',
      '기본 점검 & 워셔액 보충_(방문/이동정비)',
    ],
    distance: 92000,
  },
  {
    createdAt: '2024.12.23',
    repairShopName: '서울 SKOK',
    managerName: '김스메',
    list: [
      '에어컨 컴프레셔 교환',
      '에어컨계통 작업 후 에어컨 가스 완충',
      '에어컨 필터 교환',
    ],
    distance: 134854,
  },
  {
    createdAt: '2024.12.22',
    repairShopName: '패밀리마트 종로2가점',
    managerName: '홍길동',
    list: ['타이어 2개 교환', '앞 브레이크 패드 교환', '배터리 교체'],
    distance: 30,
  },
];

export default function HistoryPage() {
  return (
    <div className="h-full">
      <Header title="정비내역" />
      <div className="py-10 px-20 flex items-center justify-between border-b-10 border-gray10">
        <div className="flex items-center gap-4">
          <Image src={BMWIcon} alt="BMW" />
          <p className="text-heading6">311가3131</p>
        </div>
        <p>3-series(F30)</p>
      </div>
      <ul className="pb-120">
        {dummy.map((item, index) => (
          <RepairCard key={`${item.managerName}-${index}`} {...item} />
        ))}
      </ul>
      <HistoryPageBottomButton />
    </div>
  );
}
