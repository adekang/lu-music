import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { Tabs, Toast } from "antd-mobile";
import useLoginCheck from "@/hooks/useLoginCheck";
import { useNavigate } from "react-router-dom";
import { Image, Space } from "antd-mobile";
import {
  getLikedAlbums,
  getSubCountInfo,
  getUserLikedSongsIDs,
  getUserPlaylist
} from "@/services/user";

const UserInfo: React.FC = () => {
  const { userInfo, loginStates } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const { loginCheck } = useLoginCheck();
  const uid = userInfo.userId;

  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    (async function () {
      if (uid !== 0) {
        try {
          const data = await getSubCountInfo({ limit: 10 });
          const resA = await getLikedAlbums({ limit: 10 });
          const resB = await getUserLikedSongsIDs(uid);
          const resC = await getUserPlaylist({ uid });
        } catch (e) {
          return e;
        }
      }
    })();
  }, [uid]);

  const collectionRender = () => {
    return (
      <>
        <div>collectionRender</div>
      </>
    );
  };

  const favoriteRender = () => {
    return (
      <>
        <div>favoriteRender</div>
      </>
    );
  };

  const latelyPlayReander = () => {
    return (
      <>
        <div>latelyPlayReander</div>
      </>
    );
  };
  return (
    <div className="userInfoWrapper">
      <Header
        title="个人中心"
        onClose={() => {
          navigate("/");
        }}
      />
      {loginStates ? (
        <div className="userInfoContainer">
          <section className="userInfoHeader">
            <Image
              src={`${userInfo.avatarUrl}?param=150y150`}
              width={64}
              height={64}
              fit="cover"
              alt={"avatar"}
              style={{ borderRadius: 32 }}
            />
            <h1>{userInfo.nickname}</h1>
          </section>

          <section className="userTab">
            <Tabs>
              <Tabs.Tab title="收藏歌单" key="fruits">
                菠萝
              </Tabs.Tab>
              <Tabs.Tab title="我的喜欢" key="vegetables">
                西红柿
              </Tabs.Tab>
              <Tabs.Tab title="最近播放" key="animals">
                蚂蚁
              </Tabs.Tab>
            </Tabs>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(UserInfo);
