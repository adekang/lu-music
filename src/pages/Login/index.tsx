import React, { FC, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { checkLogin, phoneLogin } from "@/services/comment";
import Cookies from "js-cookie";
import { getSession, setLocalStorage, setSession } from "@/services/utils";
import md5 from "blueimp-md5";
import { changeUserInfo } from "@/store/loginSlice";

const Login: FC = function () {
  const { userInfo, loading, loginStates } = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(userInfo)

  const phoneNumberRef = useRef<any>();
  const passwordRef = useRef<any>();

  const loginButton = () => {
    const phone = phoneNumberRef.current.value;
    const password = passwordRef.current.value;
    const md5_password = md5(password);
    phoneLogin({ phone, md5_password })
      .then((data: any) => {
        const token = getSession("token");
        if (data.code === 200 && token !== data.token) {
          Cookies.set("token", data.token, { expires: 7 });
          Cookies.set("cookie", data.cookie, { expires: 7 });

          setSession("token", data.token);
          setSession("cookie", data.cookie);

          setLocalStorage("account", data.account);
          setLocalStorage("profile", data.profile);
        }
      })
      .catch(() => {
        return "登录失败";
      });
  };

  const checkLoginHandler = () => {
    const cookieToken = Cookies.get("cookie");
    cookieToken &&
      checkLogin({ cookie: encodeURIComponent(cookieToken) })
        .then((data: any) => {
          console.log(data);
        })
        .catch((err: any) => {
          return err;
        });
  };

  return (
    <>
      <div className="LoginContainer">
        <input ref={phoneNumberRef} type="number" name="phoneNumber" />
        <input ref={passwordRef} type="password" name="password" />
        <button onClick={loginButton}>登录</button>
        <br />
        <button onClick={checkLoginHandler}>检查登录</button>
      </div>
    </>
  );
};
export default Login;
