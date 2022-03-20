import React, { FC, useEffect, lazy, useState } from "react";
import { Navigate, Route, RouteObject, Routes, useRoutes } from "react-router-dom";
import styles from "./app.module.scss";
import Layout from "@/pages/index";
import NotFound from "@/pages/NotFound";
import Singers from "@/pages/Singers";
import Rank from "@/pages/Rank";
import Recommend from "@/pages/Recommend";
import Album from "@/pages/Album";
import Singer from "@/pages/Singer";
import Index from "@/pages/index";

import Player from "@/components/Player";
import routes from "@/router/route";
import { getLocalStorage, getSession } from "@/services/utils";
import { changeLoginStates, changeUserInfo } from "@/store/loginSlice";
import Cookies from "js-cookie";
import { checkLogin } from "@/services/comment";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";

const App: FC = function () {
  const element = useRoutes(routes);
  const dispatch = useAppDispatch();

  const { userInfo, loading, loginStates } = useSelector((state: RootState) => state.login);

  const [isLogin, setIsLogin] = useState(false);

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
    console.log("运行了");
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
    <div className={styles.AppWrapper}>
      {/*<Routes>*/}
      {/*  <Route path="/" element={<Index />}>*/}
      {/*    <Route path="rank" element={<Rank />} />*/}
      {/*    <Route path="singers" element={<Singers />}>*/}
      {/*      <Route path=":id" element={<Singer />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="recommend" element={<Recommend />}>*/}
      {/*      <Route path=":id" element={<Album />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="/" element={<Navigate to="/recommend" />} />*/}
      {/*    <Route path="*" element={<NotFound />} />*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
      {element}
      <Player />
    </div>
  );
};

export default App;
