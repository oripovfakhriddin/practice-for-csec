import { createContext, useState, React } from "react";
import Cookies from "js-cookie";
import { TOKEN } from "../constants";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const store = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
