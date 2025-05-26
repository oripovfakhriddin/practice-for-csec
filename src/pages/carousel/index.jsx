import React, { Fragment, useEffect, useState } from "react";
import ThemeToggle from "../../components/theme";
import Hamburger from "../../assets/icons/hamburger";
import Aos from "aos";
import Logo from "/pictures/logo-login-background.png";
import Slider from "react-slick";
import "./style.css";

const CarouselPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-in",
      once: true,
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 0,
    cssEase: "ease",
  };

  return (
    <Fragment>
      <header>
        <nav
          data-aos="fade-down"
          className="bg-white border-gray-200 dark:bg-gray-900"
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-12" alt="Fakhriddin Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Fakhriddin
              </span>
            </a>
            {isOpen ? (
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  data-collapse-toggle="navbar-default"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                >
                  <Hamburger />
                </button>
                <ThemeToggle />
              </div>
            ) : (
              ""
            )}
            <div
              className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/"
                    className="block py-2 px-3  text-gray-900  rounded-sm md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                  >
                    Bosh sahifa - 3D
                  </a>
                </li>
                <li>
                  <a
                    href="/text-3d"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Text - 3D
                  </a>
                </li>

                <li>
                  <a
                    href="/cub-3d"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Kub - 3D
                  </a>
                </li>

                <li>
                  <a
                    href="text-3d"
                    className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:text-blue-700 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Karusel
                  </a>
                </li>
              </ul>
            </div>
            {!isOpen ? (
              <div className="flex justify-between md:hidden">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  data-collapse-toggle="navbar-default"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                >
                  <Hamburger />
                </button>
                <ThemeToggle />
              </div>
            ) : (
              ""
            )}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      <main data-aos="flip-down" className="flex flex-col justify-center">
        <div className="slider-container">
          <Slider {...settings} className="flex gap-5">
            <div>
              <a href="https://csec.uz/uz/" target="_blank" rel="noreferrer">
                <img
                  src="https://csec.uz/upload/CPriority/5d5/csec-logo-new2.png"
                  alt="Kiberxavfsizlik markazi"
                />
              </a>
            </div>
            <div>
              <a href="https://csec.uz/uz/" target="_blank" rel="noreferrer">
                <img
                  src="https://csec.uz/upload/CPriority/5d5/csec-logo-new2.png"
                  alt="Kiberxavfsizlik markazi"
                />
              </a>
            </div>
            <div>
              <a href="https://csec.uz/uz/" target="_blank" rel="noreferrer">
                <img
                  src="https://csec.uz/upload/CPriority/5d5/csec-logo-new2.png"
                  alt="Kiberxavfsizlik markazi"
                />
              </a>
            </div>
            <div>
              <a href="https://csec.uz/uz/" target="_blank" rel="noreferrer">
                <img
                  src="https://csec.uz/upload/CPriority/5d5/csec-logo-new2.png"
                  alt="Kiberxavfsizlik markazi"
                />
              </a>
            </div>
            <div>
              <a href="https://csec.uz/uz/" target="_blank" rel="noreferrer">
                <img
                  src="https://csec.uz/upload/CPriority/5d5/csec-logo-new2.png"
                  alt="Kiberxavfsizlik markazi"
                />
              </a>
            </div>
            <div>
              <a href="https://csec.uz/uz/" target="_blank" rel="noreferrer">
                <img
                  src="https://csec.uz/upload/CPriority/5d5/csec-logo-new2.png"
                  alt="Kiberxavfsizlik markazi"
                />
              </a>
            </div>
          </Slider>
        </div>
      </main>
    </Fragment>
  );
};

export default CarouselPage;
