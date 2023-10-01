import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../store";
import { UserData } from "../types/authTypes";
import Input from "../components/UI/Input";
import { Formik } from "formik";
import "../assets/scss/pages/_login.scss";
import { sign } from "crypto";

const Login = () => {
  const [signUp, { data: dataSignUp = null, error: errorSignUp }] =
    authApi.useLazySignUpQuery();
  const [logIn, { data: dataLogIn = null, error: errorLogIn }] =
    authApi.useLazySignInQuery();
  const [isLogIn, setIsLogIng] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<undefined | string>(undefined);
  const query = new URLSearchParams(location.search);

  //   useEffect(() => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (accessToken === null) {
  //       const openidparams = query.get("openid.identity");

  //       if (openidparams) {
  //         const openId = openidparams.replace(
  //           "https://steamcommunity.com/openid/id/",
  //           ""
  //         );
  //         if (openId !== undefined) {
  //           logIn({ id: openId, body: query.toString() }).catch(() =>
  //             navigate("/")
  //           );
  //         }
  //       } else {
  //         navigate("/");
  //       }
  //     } else {
  //       setToken(accessToken);
  //     }
  //   }, []);

  useEffect(() => {
    if (errorLogIn) {
      navigate("/");
    } else {
      if (dataLogIn !== null) {
        const token: string | undefined = dataLogIn?.accessToken;
        const user: UserData | undefined = dataLogIn?.user;
        const refreshToken: string | undefined = dataLogIn?.refreshToken;
        if (token !== undefined && refreshToken != undefined) {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.reload();
        } else {
          navigate("/");
        }
      }
    }
  }, [dataLogIn, errorLogIn]);

  return (
    <div className="box-login-page">
      <div className="box-symbols waviy">
        <span style={{ "--i": 1 } as React.CSSProperties}>D</span>
        <span style={{ "--i": 2 } as React.CSSProperties}>E</span>
        <span style={{ "--i": 3 } as React.CSSProperties}>L</span>
        <span style={{ "--i": 4 } as React.CSSProperties}>O</span>
      </div>
      <div className="box-formik-login">
        <h1>{isLogIn ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email || !values.password) {
              //@ts-ignore
              errors.email = "Заполните все поля";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              //@ts-ignore
              errors.email = "Некорректный адрес электронной почты";
            }
            if (values.password.length < 8) {
              //@ts-ignore
              errors.password = "Некорректный пароль";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            isLogIn
              ? logIn({
                  email: values.email,
                  password: values.password,
                })
              : signUp({
                  email: values.email,
                  password: values.password,
                  role: "executor",
                });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="box-form-login">
              <input
                type="string"
                name="email"
                className="input"
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.email}
              />

              <input
                type="password"
                name="password"
                className="input"
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.password}
              />
              <div
                className="box-sign-up"
                onClick={() => setIsLogIng(!isLogIn)}
              >
                <p>{!isLogIn ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}</p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="lightBtn btn"
              >
                {isLogIn ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}
              </button>
              {(errors.email && touched.email && errors.email) ||
                (errors.password && touched.password && errors.password)}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
