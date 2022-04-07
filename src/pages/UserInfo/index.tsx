import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { Tabs } from "antd-mobile";
import useLoginCheck from "@/hooks/useLoginCheck";
import { useNavigate } from "react-router-dom";
import { Image } from "antd-mobile";
import { getUserLikedSongsIDs, getUserPlaylist, getUserRecordList } from "@/services/user";
import { Playlist } from "@/types/user";
import Scroll from "@/components/Scroll";
import { forceCheck } from "react-lazyload";
import musicLoad from "@/assets/music.png";
import LazyImage from "@/components/LazyImage";
import { getSongDetail } from "@/store/playerSlice";

const UserInfo: React.FC = () => {
  useEffect(() => {
    loginCheck();
  }, []);

  const { userInfo, loginStates } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loginCheck } = useLoginCheck();
  const uid = userInfo.userId;

  const [userCollectList, setUserCollectList] = useState<Playlist[]>([]);
  // const [userFavoriteListIds, setUserFavoriteListIds] = useState<any[]>([]);
  // const [userCollectInfo, setUserCollectInfo] = useState<any[]>([]);
  const [userRecordList, setUserRecordList] = useState<any[]>([]);
  const collectionRef = useRef<any>();
  const divRef = useRef<any>();

  useEffect(() => {
    (async function () {
      if (uid !== 0) {
        try {
          // const favoriteListIds = await getUserLikedSongsIDs(uid);
          const userRecordList = await getUserRecordList({ uid, type: 1 });
          // 用户收藏歌单
          const { playlist } = await getUserPlaylist({ uid });
          setUserCollectList(playlist);
          // setUserFavoriteListIds(favoriteListIds.ids);
          setUserRecordList(userRecordList.weekData);
        } catch (e) {
          return e;
        }
      }
    })();

    return () => {
      setUserCollectList([]);
      setUserRecordList([]);
    };
  }, [uid]);

  useEffect(() => {
    userCollectList.length !== 0 && collectionRef.current?.refresh();
  }, [userCollectList]);

  const selectItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    dispatch(getSongDetail(id));
  };

  const favoriteRender = () => {
    return (
      <>
        <div>favoriteRender</div>
      </>
    );
  };

  const collectionRender = () => {
    return (
      <>
        {userCollectList.length
          ? userCollectList?.map((item, index) => {
              if (index === 0) return;
              return (
                <div
                  key={index}
                  className="collectionListItem"
                  onClick={() => navigate(`/album/${item.id}`)}
                >
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

  const recordListRender = () => {
    return (
      <>
        {userRecordList.length &&
          userRecordList.map((item, index) => {
            return (
              <div
                key={item.song.id + "" + index}
                className="collectionListItem"
                onClick={e => selectItem(e, Number(item.song.id))}
              >
                <div className="img_wrapper">
                  <Image src={`${item.song.al.picUrl}?param=50y50`} lazy />
                </div>
                <p>{item.song.name}</p>
              </div>
            );
          })}
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
              {/*<Tabs.Tab title="我的喜欢" key="vegetables">*/}
              {/*  西红柿*/}
              {/*</Tabs.Tab>*/}
              <Tabs.Tab title="最近播放" key="animals">
                <div className="collectionList">
                  <Scroll>
                    <div>{recordListRender()}</div>
                  </Scroll>
                </div>
              </Tabs.Tab>
            </Tabs>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(UserInfo);
