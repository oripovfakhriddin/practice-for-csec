import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import LoginImg from "/pictures/logo-login-background.png";
import EmailIcon from "../../assets/icons/email";
import PasswordIcon from "../../assets/icons/password";
import OpenEyeIcon from "../../assets/icons/open-eye";
import CloseEyeIcon from "../../assets/icons/close-eye";
import ThemeToggle from "../../components/theme";
import loginSchema from "../../schema/login";
import { TOKEN } from "../../constants";
import { AuthContext } from "../../context/auth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [isPasswordToogle, setIsPasswordToogle] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      if (values.email === "admin@gmail.com" && values.password === "1234") {
        Cookies.set(TOKEN, "Token bor");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.log(toast.error("Email yoki parolingizda xatolik mavjud!"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="h-screen relative">
        <div className="absolute flex items-center gap-2 z-50 end-2 top-2">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between h-full w-full">
          <div className="md:flex items-center hidden  justify-center relative h-full w-1/2 bg-black">
            <img className="w-3/4" src={LoginImg} alt="img for login" />
          </div>
          <div className="flex items-center justify-center relative  md:w-1/2 w-full h-full p-10 dark:bg-gray-800">
            <div className="md:w-[330px] ">
              <div className="flex justify-center items-center flex-col mb-6">
                <h1 className="text-xs font-semibold text-center mb-3 w-72 dark:text-white">
                  MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI
                  UNIVERSITETI
                </h1>
                <div className=" w-20 ">
                  <img
                    src="https://lms.tuit.uz/assets/images/logo-md.png"
                    alt="Logo of tuit"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center dark:text-white">
                Kirish
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="mb-5">
                  <label
                    className=" text-sm mb-1 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="flex dark:text-white items-center gap-2 border-2 rounded border-gray-600 dark:border-gray-400 px-2 py-1">
                    <EmailIcon />
                    <input
                      id="email"
                      {...register("email")}
                      className="w-full outline-none  h-8 dark:text-white  dark:bg-gray-800"
                      type="text"
                    />
                  </div>
                  {errors?.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    className="text-sm mb-1 dark:text-white"
                    htmlFor="password"
                  >
                    Parol
                  </label>
                  <div className="flex items-center gap-2 dark:text-white border-2 rounded-md border-gray-600 dark:border-gray-400 px-2 py-1">
                    <PasswordIcon />
                    <input
                      id="password"
                      {...register("password")}
                      className="w-full outline-none h-8 dark:text-white  dark:bg-gray-800"
                      type={isPasswordToogle ? "text" : "password"}
                    />

                    <button
                      className="outline-none p-1 rounded-md transition-all dark:text-white hover:bg-slate-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPasswordToogle(!isPasswordToogle);
                      }}
                    >
                      {isPasswordToogle ? <OpenEyeIcon /> : <CloseEyeIcon />}
                    </button>
                  </div>
                  {errors?.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-black rounded-md text-white p-2 mb-4 dark:bg-blue-800"
                >
                  {loading ? `$Kutilmoqda...` : "Kirish"}
                </button>
                <div className="flex justify-between dark:text-white">
                  <p>{`Akauntingiz yo'qmi?`}</p>
                  <Link to="/register" className="text-blue-500">
                    {`Ro'yhatdan o'tish`}
                  </Link>
                </div>
              </form>
            </div>
            <p className="absolute bottom-[2%] text-xs text-center w-[90%] dark:text-white">
              Copyright © 2025 of Fakhrddin Oripov
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginPage;
