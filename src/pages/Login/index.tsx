import React, { FC, useEffect, useRef, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { checkLogin, phoneLogin } from "@/services/comment";
import Cookies from "js-cookie";
import { getSession, setLocalStorage, setSession } from "@/services/utils";
import md5 from "blueimp-md5";
import { Button } from "antd-mobile";
import Header from "@/components/Header";
import { CSSTransition } from "react-transition-group";

const Login: FC = function () {
  const { userInfo, loading, loginStates } = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          navigate("user");
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

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <div className="LoginContainer">
        <Header
          title="登录"
          onClose={() => {
            setShow(false);
          }}
        />
        <form method="POST" className="LoginForm">
          <div className="formItem">
            <input ref={phoneNumberRef} type="number" placeholder="手机号" name="phoneNumber" />
          </div>
          <div className="formItem">
            <input ref={passwordRef} type="password" placeholder="密码" name="password" />
          </div>
          <div className="fromSubmit">
            <Button color="danger" size="mini" onClick={loginButton}>
              登录
            </Button>
            <Button color="danger" size="mini" onClick={checkLoginHandler}>
              检查登录
            </Button>
            <Button color="danger" size="mini" fill="none" onClick={checkLoginHandler}>
              邮箱登录
            </Button>
          </div>
        </form>
      </div>
    </CSSTransition>
  );
};
export default Login;
