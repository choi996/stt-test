import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const font = localFont({
  src: [
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: '차량 안전 진단',
  description: '스피드메이트 차량 안전진단',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-dvh">
      <body className={`${font.className} h-full max-w-1024 mx-auto`}>
        {children}
      </body>
    </html>
  );
}
