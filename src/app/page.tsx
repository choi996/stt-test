import 'regenerator-runtime/runtime';
import styles from './page.module.css';
import MainImage from '@/assets/images/main.png';
import SpeedmateLogoImage from '@/assets/images/speedmate.png';
import Image from 'next/image';
import LoginForm from '@/components/loginForm';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main_img_wrapper}>
        <Image
          src={MainImage}
          priority
          alt="main"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>
          <b>Speedmate Check-Mate</b>
          <p>Trust your car to the experts</p>
        </div>
        <div className={styles.speedmate}>
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
