import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/UsersSlice';
import { useLoginMutation } from '../services/usersApi';
import { AuthResponse } from '../utils/AuthResponse';
import { LoginRequest } from '../utils/LoginRequest';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.clear();

    (await login(loginInfo)
      .unwrap()
      .then((res) => {
        console.log(res);
        localStorage.setItem('jwt', res.access_token!);
        localStorage.setItem('refresh', res.access_token!);
        dispatch(setUser(res));
        navigate('/');
        return res;
      })
      .catch((err) => console.log(err))) as AuthResponse;
  };

  return (
    <div className="flex justify-center items-center align-center h-screen text-gray-500 shadow-xl shadow-black/60">
      <div className="w-[350px] bg-white rounded-[10px] h-[500px] md:h-[550px]">
        <h1 className="text-4xl text-[#4b2354] font-bold text-center p-4 pt-16">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center text-center mt-4"
        >
          <div className="flex flex-col items-center space-y-4 mb-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              className="input"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />

            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="input"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </div>

          <button className="login-button">Login</button>
          <p className="text-sm text-gray-500 mt-4">
            Avez vous deja un compte?{' '}
            <Link
              to="/signup"
              className="text-[#4b2354] font-bold hover:underline italic underline"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
