import React, { FC, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { phoneLogin } from "@/services/comment";
import Cookies from "js-cookie";
import { getSession, setLocalStorage, setSession } from "@/services/utils";

const Login: FC = function () {
  const { loading, rankList } = useSelector((state: RootState) => state.rank);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const phoneNumberRef = useRef<any>();
  const passwordRef = useRef<any>();

  const loginButton = () => {
    const phone = phoneNumberRef.current.value;
    const password = passwordRef.current.value;

    console.log(phone, password);
    phoneLogin({ phone, password })
      .then((data: any) => {
        console.log(data);

        const token = getSession("token");
        if (data.code === 200 && token !== data.token) {
          Cookies.set("token", data.token, { expires: 7 });
          Cookies.set("cookie", data.cookie, { expires: 7 });
          setSession("token", data.token);
          setLocalStorage("account", data.account);
          setLocalStorage("profile", data.profile);
        }
      })
      .catch(() => {
        return "登录失败";
      });
  };

  return (
    <>
      <div className="LoginContainer">
        <input ref={phoneNumberRef} type="number" name="phoneNumber" />
        <input ref={passwordRef} type="password" name="password" />
        <button onClick={loginButton}>登录</button>
      </div>
    </>
  );
};
export default Login;
