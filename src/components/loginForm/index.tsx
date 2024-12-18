'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import styles from './loginForm.module.css';
import Input from '../input';
import FloatBottomWrapper from '../floatBottomWrapper';

export default function LoginForm() {
  const { push } = useRouter();

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const clearBlank = (s: string) => s.replace(/ /g, '');

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
    push('/inspect');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.input_wrapper}>
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
