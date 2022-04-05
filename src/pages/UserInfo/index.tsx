import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Tabs } from "antd-mobile";
import useLoginCheck from "@/hooks/useLoginCheck";
import { useNavigate } from "react-router-dom";
import { Image } from "antd-mobile";
import {
  getLikedAlbums,
  getSubCountInfo,
  getUserLikedSongsIDs,
  getUserPlaylist
} from "@/services/user";
import { Playlist } from "@/types/user";
import Scroll from "@/components/Scroll";
import { forceCheck } from "react-lazyload";
import musicLoad from "@/assets/music.png";
import LazyImage from "@/components/LazyImage";

const UserInfo: React.FC = () => {
  const { userInfo, loginStates } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const { loginCheck } = useLoginCheck();
  const uid = userInfo.userId;

  const [userPlayList, setUserPlayList] = useState<Playlist[]>([]);

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
          // 用户的歌单
          const playList = await getUserPlaylist({ uid });
          setUserPlayList(playList.playlist);
        } catch (e) {
          return e;
        }
      }
    })();
  }, [uid]);

  const collectionRender = () => {
    return (
      <>
        {userPlayList.length
          ? userPlayList?.map(item => {
              return (
                <div key={item.id} className="collectionListItem">
                  <div className="img_wrapper">
                    <LazyImage imgSrc={`${item.coverImgUrl}?param=50y50`} loadImg={musicLoad} />
                  </div>
                  <p>{item.name}</p>
                </div>
              );
            })
          : null}
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

  const collectionRef = useRef<any>();
  const divRef = useRef<any>();

  useEffect(() => {
    console.log(divRef.current?.offsetHeight);
    userPlayList.length !== 0 && collectionRef.current?.refresh();
  }, [userPlayList]);

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
              style={{ borderRadius: 32 }}
            />
            <h1>{userInfo.nickname}</h1>
          </section>

          <section className="userTab">
            <Tabs>
              <Tabs.Tab title="收藏歌单" key="fruits">
                <div className="collectionList">
                  <Scroll bounceTop={true} ref={collectionRef} onScroll={forceCheck}>
                    <div ref={divRef}>{collectionRender()}</div>
                  </Scroll>
                </div>
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
