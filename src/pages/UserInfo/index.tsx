import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { Toast } from "antd-mobile";
import useLoginCheck from "@/hooks/useLoginCheck";
import { useNavigate } from "react-router-dom";

const UserInfo: React.FC = () => {
  const { userInfo, loginStates } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  const { loginCheck } = useLoginCheck();

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="userInfoWrapper">
      <Header
        title="用户信息"
        onClose={() => {
          navigate("/");
        }}
      />
      {loginStates ? (
        <div className="userInfoContainer">
          <h1>{userInfo.userId}</h1>
          <img src={`${userInfo.avatarUrl}?param=150y150`} alt="avatar" />
          <h1>{userInfo.nickname}</h1>
          <h1>{userInfo.vipType}</h1>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(UserInfo);
