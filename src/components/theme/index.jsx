import React, { Fragment, useEffect, useState } from "react";

import { THEME } from "../../constants";
import LightIcon from "../../assets/icons/light";
import DarkIcon from "../../assets/icons/dark";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem(THEME);
    if (theme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME, "light");
    }
  }, [darkMode]);

  return (
    <Fragment>
      <div>
        <button
          className="p-1 text-black rounded-lg transition hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 focus:outline-none"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? <LightIcon /> : <DarkIcon />}
        </button>
      </div>
    </Fragment>
  );
};

export default ThemeToggle;
