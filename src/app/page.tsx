import 'regenerator-runtime/runtime';
import MainImage from '@/assets/images/main.png';
import SpeedmateLogoImage from '@/assets/images/speedmate.png';
import Image from 'next/image';
import LoginForm from '@/app/_components/LoginForm2';

export default function Home() {
  return (
    <div className="w-full max-w-1024 my-0 mx-auto">
      <div className="w-full relative aspect-[7/10]">
        <Image
          src={MainImage}
          priority
          alt="main"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="absolute top-0 w-full">
        <div className="py-20 px-16 bg-gray12">
          <h1 className="text-heading3">Speedmate Check-Mate</h1>
          <p className="text-body6 text-gray4">Trust your car to the experts</p>
        </div>
        <div className="pt-20 px-20 pb-40 bg-gradient-to-b from-gray12 to-gray0">
          <Image
            src={SpeedmateLogoImage}
            alt="speedmate"
            width={111}
            height={18}
          />
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
