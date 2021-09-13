import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useInput } from '../../hooks';
import { toastError, toastSuccess } from '../../utils/toastify';

const Login: FC = () => {
  const [passwordError, setPasswordError] = useState<string>('');
  const [verifyToggle, setVerifyToggle] = useState<boolean>(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordChk, onChangePasswordChk] = useInput('');

  const [verifyCode, onChangeVerifyCode] = useInput('');

  const [loginEmail, onChangeLoginEmail] = useInput('');
  const [loginPassword, onChangeLoginPassword] = useInput('');

  const onSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (passwordError || !email || !nickname || !password) return;

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users`,
        {
          email: email,
          nickname,
          password: password,
        },
      );

      if (response.statusText === 'Created') {
        setVerifyToggle(true);
        toastSuccess('verify code has been sent');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/auth/verify`,
        {
          email: email,
          verifyCode,
        },
      );

      if (response.statusText === 'Created') {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!loginEmail || !loginPassword) return;

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users/login`,
        {
          email: loginEmail,
          password: loginPassword,
        },
      );

      if (response.statusText === 'Created') {
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (password === passwordChk) {
      setPasswordError('');
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    }
  }, [password, passwordChk]);

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex justify-center items-center bg-purple-300 flex-auto">
        <FontAwesomeIcon className="text-20-rem text-white" icon={faTwitter} />
      </div>
      <div className="max-w-screen-sm md:m-8 flex-auto">
        <div>
          <FontAwesomeIcon
            className="text-purple-500 text-4xl mb-8"
            icon={faTwitter}
          />
        </div>
        <div className="font-black text-6xl mb-4">What's happening</div>
        <div className="mb-8">
          <div className="font-bold text-4xl mb-2">Sign up</div>

          {verifyToggle ? (
            <form onSubmit={onSubmitVerifyCode}>
              <div className="input mb-2 w-96 text-2xl bg-gray-300">
                {email}
              </div>
              <br />
              <input
                className="input mb-2 w-96 text-2xl"
                type="text"
                placeholder="Verify code"
                value={verifyCode}
                onChange={onChangeVerifyCode}
                maxLength={10}
              />
              <br />
              <input
                className="input w-96 text-2xl bg-white"
                type="submit"
                value="Verify"
              />
            </form>
          ) : (
            <form onSubmit={onSubmitSignup}>
              <input
                className="input mb-2 w-96 text-2xl"
                placeholder="Email"
                type="text"
                value={email}
                onChange={onChangeEmail}
              />
              <br />
              <input
                className="input mb-2 w-96 text-2xl"
                placeholder="NickName"
                type="text"
                value={nickname}
                onChange={onChangeNickname}
              />
              <br />
              <input
                className="input mb-2 w-96 text-2xl"
                placeholder="Password"
                type="password"
                value={password}
                onChange={onChangePassword}
              />
              <br />
              <input
                className="input mb-2 w-96 text-2xl"
                placeholder="Password Check"
                type="password"
                value={passwordChk}
                onChange={onChangePasswordChk}
              />
              <br />
              <input
                className="input w-96 text-2xl bg-white"
                type="submit"
                value="Sign up"
              />
              {passwordError && (
                <div className="text-red-600 text-sm">{passwordError}</div>
              )}
            </form>
          )}
        </div>

        <div className="mb-8">
          <div className="text-xl mb-2">
            Already have an account? <span className="font-bold">Log in</span>
          </div>
          <form onSubmit={onSubmitLogin}>
            <input
              className="input mb-2 w-96 text-2xl"
              placeholder="Email"
              type="text"
              value={loginEmail}
              onChange={onChangeLoginEmail}
            />
            <br />
            <input
              className="input mb-2 w-96 text-2xl"
              placeholder="Password"
              type="password"
              value={loginPassword}
              onChange={onChangeLoginPassword}
            />
            <br />
            <input
              className="input w-96 text-2xl bg-white"
              type="submit"
              value="Log in"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
