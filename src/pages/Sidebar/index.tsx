import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import FontIcon from "@/components/IconCom";

interface Props {
  show: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = props => {
  const { show, onClose } = props;
  const { userInfo, loginStates } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  const goTo = (to: string) => {
    navigate(to);
    onClose();
  };
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => onClose}
    >
      <div className="sideBarWrapper">
        <div
          className="mask"
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
        />
        <div className="sideBarContainer">
          <ul>
            <li onClick={() => goTo("/login")}>登录注册</li>
          </ul>
          <h1>sideBar</h1>
          <button onClick={onClose}>关闭</button>
          <div className="cardWrapper">
            <p className="text">其他</p>
            <ul className="card">
              <li>
                <span className="icon-l">
                  <FontIcon icon="&#xe644;" />
                </span>
                <span>设置</span>
                <span className="icon-r">
                  <FontIcon icon="&#xe662;" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(Sidebar);
