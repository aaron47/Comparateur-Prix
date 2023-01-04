import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../services/usersApi';
import { CreateUserRequest } from '../utils/CreateUserRequest';
import { ToastOptions, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [signUpInfo, setSignUpInfo] = useState<CreateUserRequest>({
    email: '',
    password: '',
    magasinSelectionne: '',
  });
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const toastOptions: Partial<ToastOptions> = {
    position: 'bottom-right',
    autoClose: 1200,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.clear();

    await signUp(signUpInfo)
      .unwrap()
      .then((res) => {
        console.log(res);
        localStorage.setItem('jwt', res.access_token!);
        localStorage.setItem('refresh', res.refresh_token!);
        navigate('/');
        return res;
      })
      .catch((err: any) => toast.error(err.data.message[0], toastOptions));
  };

  return (
    <div className="flex justify-center items-center align-center h-screen text-gray-500 shadow-xl shadow-black/60">
      <div className="w-[350px] bg-white rounded-[10px] h-[500px] md:h-[550px]">
        <h1 className="text-4xl text-[#4b2354] font-bold text-center p-4 pt-16">
          Sign Up
        </h1>

        <form
          onSubmit={handleSignUp}
          className="flex flex-col justify-center items-center text-center mt-4"
        >
          <div className="flex flex-col items-center space-y-3 md:space-y-4 mb-2 md:mb-6">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              className="input"
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, email: e.target.value })
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
                setSignUpInfo({ ...signUpInfo, password: e.target.value })
              }
            />

            <select
              id="small"
              className="shadow-black/20 md:w-full w-[250px] p-4 text-sm text-[#4b2354] border rounded-lg bg-gray-50 focus:ring-[#4b2354] focus:border-[#4b2354] outline-none"
              onChange={(e) =>
                setSignUpInfo({
                  ...signUpInfo,
                  magasinSelectionne: e.target.value,
                })
              }
            >
              <option defaultValue="JUMIA">
                Nom de magasin que vous choisissez
              </option>
              <option value="JUMIA">Jumia</option>
              <option value="TUNISIANET">Tunisianet</option>
            </select>
          </div>
          <button className="signup-button">Sign Up</button>

          <p className="text-sm text-gray-500 mt-4">
            Avez vous deja un compte?{' '}
            <Link
              to="/login"
              className="text-[#4b2354] font-bold hover:underline italic underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
