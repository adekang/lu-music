import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import FontIcon from "@/components/FontIcon";
import { CardList } from "@/types/CardList";
import { cardList } from "@/pages/Sidebar/mock";
import { Button } from "antd-mobile";
import { checkLogin, logout } from "@/services/comment";
import Cookies from "js-cookie";
import useLoginCheck from "@/hooks/useLoginCheck";

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

  const logoutHandler = useCallback(() => {
    logout();
  }, []);

  const checkLoginHandler = () => {
    const cookieToken = Cookies.get("cookie");
    checkLogin({ cookie: encodeURIComponent(cookieToken as string) })
      .then((data: any) => {
        console.log(data);
      })
      .catch((err: any) => {
        return err;
      });
  };
  const cardRender = (list: CardList[]) => {
    if (list.length === 0) return;
    return (
      <>
        {list.map((item, index) => {
          return (
            <div className="cardWrapper" key={index}>
              {item.title && <p className="text">{item.title}</p>}
              <ul className="card">
                {item.options.length
                  ? item.options.map((options, index) => {
                      return (
                        <li key={index} onClick={() => goTo(options.goto as string)}>
                          <div className="icon-l">
                            <FontIcon icon={options.icon_l} />
                          </div>
                          <span>{options.text}</span>
                          <div className="icon-r">
                            <FontIcon icon={options.icon_r} />
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          );
        })}
      </>
    );
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
          {cardRender(cardList)}
          <Button className="logOut" onClick={logoutHandler}>
            推出登录
          </Button>
          <Button className="logOut" onClick={checkLoginHandler}>
            检查登录
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(Sidebar);
