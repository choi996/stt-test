import Image from 'next/image';
import SMLogo from '@/assets/images/sm_logo.png';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <Image src={SMLogo} alt="SK Speedmate" width={140} />
      차량 점검 내역서
    </header>
  );
}
