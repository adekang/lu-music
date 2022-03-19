import React, { FC, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import "@/assets/scss/index.scss";
import { getCookie, getLocalStorage, getSession } from "@/services/utils";
import { changeLoginStates, changeUserInfo } from "@/store/loginSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { checkLogin } from "@/services/comment";
import Cookies from "js-cookie";

const Index: FC = function () {
  const { userInfo, loading, loginStates } = useSelector((state: RootState) => state.login);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  // console.log("session--token::>>", getSession("token"));
  // console.log("cookie--cookie::>>", getCookie("cookie"));
  // console.log("cookie--token::>>", getCookie("token"));
  // console.log("localStorage--account::>>", getLocalStorage("account"));
  // console.log("localStorage--account::>>", getLocalStorage("profile"));
  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    if (isLogin) {
      const profile = getLocalStorage("profile");
      if (profile === "undefined") return;
      dispatch(
        changeUserInfo({
          userId: profile.userId,
          nickname: profile.nickname,
          avatarUrl: profile.avatarUrl,
          vipType: profile.vipType
        })
      );
      dispatch(changeLoginStates(true));
    } else {
      dispatch(changeLoginStates(false));
    }
  }, [isLogin]);

  const loginCheck = () => {
    const cookieToken = Cookies.get("cookie");
    cookieToken &&
      checkLogin({ cookie: encodeURIComponent(cookieToken) })
        .then((data: any) => {
          if (data.data.code === 200) {
            setIsLogin(true);
          }
        })
        .catch((err: any) => {
          return err;
        });
  };
  return (
    <div className={"indexWrapper"}>
      <nav className={"header"}>
        <h1
          onClick={() => {
            navigate("login");
          }}
        >
          <UnorderedListOutline />
        </h1>
        <h1>lu music</h1>
        <h1
          onClick={() => {
            navigate("search");
          }}
        >
          <SearchOutline />
        </h1>
      </nav>
      <nav className={"navWrapper"}>
        <ul>
          <li>
            <NavLink to="recommend">主页</NavLink>
          </li>
          <li>
            <NavLink to="rank">排行</NavLink>
          </li>
          <li>
            <NavLink to="singers">歌手</NavLink>
          </li>
        </ul>
      </nav>
      <div className={"outlet"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
