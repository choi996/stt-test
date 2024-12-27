'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import Input from '../Input';
import FloatBottomWrapper from '../FloatBottomWrapper';
import { clearBlank } from '@/app/_lib/utils';
import Link from 'next/link';

export default function LoginForm() {
  const { push } = useRouter();

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeCode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCode(clearBlank(value));
  }, []);

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setPassword(clearBlank(value));
    },
    [],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push('/searchcar');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-24 px-20 pb-120">
        <div className="flex flex-col gap-12">
          <Input
            name="code"
            placeholder="매장코드 입력 (cf.S001, F001)"
            autoComplete="username"
            value={code}
            onChange={handleChangeCode}
          />
          <Input
            placeholder="비밀번호 입력 (웹포스 접속 비밀번호)"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangePassword}
          />
          <Link
            className="mt-12 w-fit text-button4 underline text-systemBlue1"
            href={'/stt-test'}
          >
            STT API별 성능 테스트
          </Link>
        </div>
      </div>
      <FloatBottomWrapper label="로그인" disabled={!code || !password} />
    </form>
  );
}
