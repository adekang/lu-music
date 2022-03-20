import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { Toast } from "antd-mobile";

const UserInfo: React.FC = () => {
  const { userInfo, loading, loginStates } = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStates) {
      Toast.show({
        position: "top",
        content: "用户还没有登录，请登录！"
      });
      navigate("/login");
    }
  }, [loginStates]);

  return (
    <div className="userInfoWrapper">
      <Header title="用户信息" />
      <div className="userinfoContainer">
        <h1>{userInfo.userId}</h1>
        <img src={`${userInfo.avatarUrl}?param=150y150`} alt="avatar" />
        <h1>{userInfo.nickname}</h1>
        <h1>{userInfo.vipType}</h1>
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
