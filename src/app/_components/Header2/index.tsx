import Image from 'next/image';
import SMLogo from '@/assets/images/sm_logo.png';

export default function Header() {
  return (
    <header className="max-[300px]:grid text-center  flex items-center justify-center gap-8 py-20 px-24 border-b border-solid border-gray7">
      <Image
        src={SMLogo}
        width={140}
        height={0}
        style={{ height: 20 }}
        alt="SK Speedmate"
      />
      <p className="text-body7_m">차량 점검 내역서</p>
    </header>
  );
}
