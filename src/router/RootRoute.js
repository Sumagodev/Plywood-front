import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { axiosApiInstance } from "../App";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProtectedRoute, { useLoginRedirectPath, useLogoutRedirectPath } from "../components/ProtectedRoute";
import ScrollTop from "../components/Utility/ScrollTop";
import { removeToken } from "../services/User.service";
import { routes } from "./routes";
import Movingicon from "../components/Movingicon";
export default function RootRoute() {
  
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const authToken = useSelector((state) => state.auth.token)
  const location = useLocation();

  const logoutUser = () => {
    removeToken();
    // setIsAuthorized(false);
  };


  useMemo(() => {

    axiosApiInstance.interceptors.request.use(
      async (config) => {
        // console.log(token)
        if (authToken) {
          config.headers["authorization"] = "Bearer " + authToken;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    axiosApiInstance.interceptors.response.use(
      (res) => {
        // Add configurations here
        return res;
      },
      async (err) => {
        console.log("INterceptor error");

        // logoutUser()

        return Promise.reject(err);
      }
    );
  }, [isAuthorized]);

  const logoutRedirectPath = useLogoutRedirectPath();

  const loginRedirectPath = useLoginRedirectPath();

  useEffect(() => {
    console.log({ redirectPath: loginRedirectPath, isAuthorized }, "asdf");
  }, [logoutRedirectPath, isAuthorized]);
  return (
    <>
      <Header auth={isAuthorized} />
      <ScrollTop />














      <Routes>
        {routes.map((el, index) => {
          return (
            <Route
              key={index}
              // exact
              path={el.path}
              element={
                el.isAuthorized ? (
                  <ProtectedRoute isAllowed={isAuthorized} redirectPath={logoutRedirectPath}>
                    {el.component}
                  </ProtectedRoute>
                ) : el.isUnProtected ? (
                  <ProtectedRoute isAllowed={!isAuthorized} redirectPath={loginRedirectPath}>
                    {el.component}
                  </ProtectedRoute>
                ) : (
                  <>{el.component}</>
                )
              }
            />
          );
        })}
      
      </Routes>
      <Footer />
    </>
  )
}
