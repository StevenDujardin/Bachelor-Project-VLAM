import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/useAuth";

const Login: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [easterEgg, setEasterEgg] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for storing error message

  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await axios.post(
        `${apiUrl}/users/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      setLoggedIn(true);
      localStorage.setItem("user_id", response.data.user_id);
      navigate(-1)
    } catch (error) {
      console.error("Login error:", error);

      if ((error as AxiosError).response?.status === 400) {
        const errorMessage = (error as AxiosError).response?.data as string;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center font-poppins ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 p-8 min-w-96  bg-mantis-300 rounded-2xl border border-mantis-200 shadow-lg"
      >
        <div onDoubleClick={() => setEasterEgg(!easterEgg)}>
          <div className="flex max-w-full justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97"
              height="97"
              viewBox="0 0 603.2 603.2"
            >
              <path
                d="M78.7 0h445.9c43.5 0 78.7 35.2 78.7 78.7v445.9c0 43.5-35.2 78.7-78.7 78.7H78.7C35.2 603.2 0 568 0 524.6V78.7C0 35.2 35.2 0 78.7 0z"
                fill="#45ac34"
              ></path>
              <path
                d="M104.3 82.4v69.2h20c5.8 0 8.8 2.9 8.8 8.4v8c0 5.5-3.1 8.3-8.8 8.3H81.7c-5.8 0-8.8-2.8-8.8-8.3V82.4c0-5.5 3-8.4 8.8-8.4h13.9c5.7 0 8.7 2.9 8.7 8.4zm99.9 0v7.9c0 5.6-3.1 8.5-8.7 8.5h-24.4v13.7h23.1c5.6 0 8.6 2.9 8.6 8.4v7.8c0 5.6-3.1 8.4-8.6 8.4h-23.1v14.5h24.4c5.6 0 8.7 2.9 8.7 8.4v7.8c0 5.6-3.1 8.4-8.7 8.4h-47c-5.8 0-8.8-2.8-8.8-8.3V82.4c0-5.5 3-8.4 8.8-8.4h47c5.6 0 8.7 2.9 8.7 8.4zm89.9-1.1c0 1.2-.3 2.3-.8 3.4L278 124.4l15.9 41.7c.4 1.1.6 2.2.6 3.3 0 4.1-2.4 7-8 7h-14c-6 0-9-1.6-10.8-6.8l-11.4-32.2h-5.8V168c0 5.5-2.9 8.3-8.7 8.3h-14c-5.8 0-8.8-2.8-8.8-8.3V82.4c0-5.5 3-8.4 8.8-8.4h13.9c5.8 0 8.7 2.9 8.7 8.4v28.9h5.8l11.1-30.6c1.8-5 4.5-6.7 10.8-6.7h13.7c5.5 0 8.3 2.9 8.3 7.3zm88.5 0c0 1.2-.3 2.3-.8 3.4l-15.4 39.7 15.9 41.7c.4 1.1.6 2.2.6 3.3 0 4.1-2.4 7-8 7h-14c-6 0-9-1.6-10.8-6.8l-11.4-32.2h-5.8V168c0 5.5-2.9 8.3-8.7 8.3h-14c-5.8 0-8.8-2.8-8.8-8.3V82.4c0-5.5 3-8.4 8.8-8.4h13.9c5.8 0 8.7 2.9 8.7 8.4v28.9h5.8l11.1-30.6c1.8-5 4.5-6.7 10.8-6.7h13.7c5.6 0 8.4 2.9 8.4 7.3zm71.9 1.1v7.9c0 5.6-3.1 8.5-8.7 8.5h-24.4v13.7h23.1c5.6 0 8.6 2.9 8.6 8.4v7.8c0 5.6-3.1 8.4-8.6 8.4h-23.1v14.5h24.4c5.6 0 8.7 2.9 8.7 8.4v7.8c0 5.6-3.1 8.4-8.7 8.4h-47c-5.8 0-8.8-2.8-8.8-8.3V82.4c0-5.5 3-8.4 8.8-8.4h47c5.5 0 8.7 2.9 8.7 8.4zm84.5 18.1v9.3c0 12.6-5.3 19.7-17.9 20.9 12.7.9 17.9 7.4 17.9 19.6V168c0 5.5-3 8.3-8.7 8.3h-14.1c-5.5 0-8.6-2.8-8.6-8.3v-25.1h-13V168c0 5.5-2.9 8.3-8.7 8.3H472c-5.8 0-8.8-2.8-8.8-8.3V82.4c0-5.5 3-8.4 8.8-8.4h37.2c20 0 29.8 8 29.8 26.5zm-44.4-1.7v20.4h13V98.8h-13z"
                fill="#00692f"
              ></path>
              <path
                d="M156.9 201.3c0 .8-.1 1.5-.3 2.3l-20.9 86.2c-.9 3.9-4.3 6.7-8.3 6.8H99c-4.1 0-7.6-2.9-8.5-6.8l-20.8-86.2c-.2-.7-.3-1.5-.3-2.3 0-4.8 3.1-7.1 9-7.1h14.3c5.5 0 8.8 2.1 9.6 7.3l11 68.7 10.8-68.7c.9-5.2 4.1-7.3 9.6-7.3H148c5.7.1 8.9 2.4 8.9 7.1zm65.2.4l23.1 85.3c.3.9.4 1.8.4 2.7 0 3.9-3.3 6.9-8.8 6.9H224c-5.5 0-8.1-2.2-9.2-7.5l-1.6-7.9H186l-1.6 8c-1 5.4-4.3 7.5-9.3 7.5h-12.7c-5.6 0-8.8-3-8.8-6.9 0-.9.2-1.8.4-2.6l22.9-85.4c1.4-5.2 5.1-7.4 10.1-7.4h25.3c4.7-.1 8.3 2.2 9.8 7.3zm-30.3 55.9h15.3l-7.6-37.3-7.7 37.3zm141.3-55v85.8c0 5.5-3 8.2-8.6 8.2h-14.2c-6.6 0-9.6-2.1-11.8-7.6l-16.9-42.4c.9 8.4 1.3 16.9 1.3 25.3v16.3c0 5.5-3.1 8.3-8.8 8.3h-11c-5.6 0-8.8-2.8-8.8-8.3v-85.8c0-5.5 3.1-8.3 8.6-8.3h14.4c7.2 0 9.5 2.1 11.7 7.6l16.9 42.4c-.9-8.4-1.3-16.8-1.2-25.2v-16.4c0-5.5 2.9-8.4 8.6-8.4h11.1c5.6.2 8.7 3 8.7 8.5zm103.1 18.2v3c0 13.2-5.1 19.8-17.7 21.2 13.2 1.6 20.1 7.4 20.1 21.5v3.3c0 18.5-9.6 26.8-29.6 26.8h-39.6c-5.8 0-8.8-2.8-8.8-8.3v-85.6c0-5.5 3-8.4 8.8-8.4h37.2c19.9 0 29.6 8 29.6 26.5zm-44.3-2.2v15.3h13v-15.3h-13zm0 37.5v16.1h15.4v-16.1h-15.4zm86-53.5v85.6c0 5.5-2.9 8.3-8.7 8.3h-13.9c-5.8 0-8.8-2.8-8.8-8.3v-85.6c0-5.5 3-8.4 8.8-8.4h13.9c5.8.1 8.7 2.9 8.7 8.4zm58.3 0v77.7c0 22.3-13.5 32.5-38.3 32.5h-3.4c-5.7 0-8.8-2.9-8.8-8.5v-7.9c0-5.5 3.1-8.5 8.8-8.5h3.3c4.4 0 7.1-.6 7.1-4.8V219h-9.5c-5.7 0-8.7-2.9-8.7-8.5v-7.9c0-5.5 4.1-8.4 9.8-8.4h32c5.8.1 7.7 2.9 7.7 8.4zM152.5 343.5v44.4c0 20.3-11.6 29.7-33.5 29.7h-12.6c-21.8 0-33.5-9.4-33.5-29.7v-44.4c0-20.3 11.7-29.7 33.5-29.7H119c21.9.1 33.5 9.4 33.5 29.7zm-48.2-4.1V392h16.8v-52.6h-16.8zm138.9-16.5v85.8c0 5.5-3 8.2-8.6 8.2h-14.2c-6.6 0-9.6-2.1-11.8-7.6L191.7 367c.9 8.4 1.4 16.8 1.3 25.3v16.3c0 5.5-3.1 8.3-8.8 8.3h-11c-5.6 0-8.8-2.8-8.8-8.3v-85.8c0-5.5 3.1-8.3 8.6-8.3h14.4c7.2 0 9.5 2.1 11.7 7.6l16.9 42.4c-.9-8.4-1.3-16.8-1.2-25.2v-16.4c0-5.5 2.9-8.4 8.6-8.4h11.1c5.6 0 8.7 2.9 8.7 8.4zm89.5 19.8v.6c0 5.5-3.1 8.4-8.6 8.4h-13.9c-5.8 0-8.8-2.9-8.8-8.4v-4.7h-15.7v11.3l25.9 7.8c16.9 5 21.7 11.9 21.7 27.1v3.2c0 20.2-11.6 29.6-33.5 29.6h-12.3c-21.9 0-33.6-9.2-33.6-28.9v-1c0-5.5 2.9-8.4 8.7-8.4h14c5.7 0 8.7 2.9 8.7 8.4v5.2H302V382l-25.8-7.8c-14.9-4.5-21.9-11.2-21.9-27.1v-3.7c0-20.4 11.6-29.7 33.5-29.7h11.3c22 .2 33.6 9.4 33.6 29z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          {easterEgg && (
            <div className="mt-2 rounded bg-mantis-100 p-2 text-center font-bold text-shades-0 select-none">
              <p>{"by Tactical, ProstiDude10, Morsatra, PIP :)"}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xl font-semibold text-shades-0 select-none">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border ${errorMessage == "Username is required" ? "border-red-600" : "border-mantis-400"} bg-mantis-100 rounded-md px-3 py-3 font-350 leading-8 placeholder:text-neutral-400 focus:outline-none`}
              // {...register('usename', { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1 whitespace-nowrap">
            <label className="text-xl font-semibold text-black select-none">
              Password
            </label>
            <div className="flex flex-row-reverse">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={` w-full border ${errorMessage == "Password is required" ? "border-red-600" : "border-mantis-400"} bg-mantis-100 rounded-md px-3 py-3 font-350 leading-8 placeholder:text-neutral-400 focus:outline-none`}
              ></input>
              <div
                className="absolute -translate-x-4 translate-y-4 my-auto aspect-square w-6 shrink-0 text-lvboSpectrum-700"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </div>
            </div>
          </div>
          <div className="relative flex justify-center w-full">
            {errorMessage && (
              <div className="absolute -translate-y-3 w-full text-center p-2  text-red-500 rounded-md select-none">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
        <button
          className="bg-lvboSpectrum-500 hover:bg-lvboSpectrum-600 transition duration-200 active:bg-lvboSpectrum-700 border border-lvboSpectrum-400 font-centerBold  rounded-md px-4 py-2 text-xl text-white select-none"
          type="submit"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default Login;
