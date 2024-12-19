'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import Input from '../Input2';
import FloatBottomWrapper from '../FloatBottomWrapper2';
import { clearBlank } from '@/app/_lib/utils';

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
        </div>
      </div>
      <FloatBottomWrapper label="로그인" disabled={!code || !password} />
    </form>
  );
}
