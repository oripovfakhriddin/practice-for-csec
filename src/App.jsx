import { React, Fragment, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import HomePage from "./pages/home";
import { AuthContext } from "./context/auth";
import Text3DPage from "./pages/text-3d";
import Cub3DPage from "./pages/cub";
import CarouselPage from "./pages/carousel";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/text-3d"
            element={
              isAuthenticated ? <Text3DPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/cub-3d"
            element={isAuthenticated ? <Cub3DPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/carousel"
            element={
              isAuthenticated ? <CarouselPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
