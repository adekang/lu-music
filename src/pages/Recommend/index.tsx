import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { getAlbumDetailRequest, getBannerRequest, getHotList } from "@/services/comment";
import { Image, Swiper } from "antd-mobile";
import { BannerList, SongList } from "@/pages/Recommend/types";
import styles from "./recommend.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Scroll from "@/components/Scroll";
import { useAppDispatch } from "@/store";
import { changeCurrentIndex, changePlayList, changeSequencePlayList } from "@/store/playerSlice";

interface Props {
  name?: string;
}

const Recommend: FC<Props> = props => {
  const [bannerList, setBannerList] = useState<BannerList[]>([]);
  const [songList, setSongList] = useState<SongList[]>([]);
  const [newsongList, setNewSongList] = useState<SongList[]>([]);

  const navigate = useNavigate();

  const goToId = (id: number) => {
    navigate(`./${id}`);
  };

  useEffect(() => {
    getBannerRequest()
      .then((data: { banners: BannerList[] }) => {
        const { banners } = data;
        setBannerList(banners);
      })
      .catch((e: unknown) => {
        console.log(e);
      });
    getHotList({
      limit: 10
    })
      .then((data: { result: SongList[] }) => {
        const { result } = data;
        setSongList(result);
      })
      .catch((e: unknown) => {
        console.log(e);
      });
    // TODO 获取的是歌单
    getAlbumDetailRequest(6727687679)
      .then((data: { playlist: { tracks: any } }) => {
        const { playlist } = data;
        setNewSongList(playlist.tracks);
      })
      .catch((e: unknown) => {
        console.log(e);
      });
    return () => {
      setBannerList([]);
      setSongList([]);
      setNewSongList([]);
    };
  }, []);

  const dispatch = useAppDispatch();
  const categoryRef = useRef<any>();

  useEffect(() => {
    const Dom = categoryRef.current;
    const tagElems = Dom.querySelectorAll("li");
    let totalWidth = 0;
    tagElems.forEach((ele: any) => {
      totalWidth += ele.offsetWidth + 8;
    });
    Dom.style.width = `${totalWidth - 8}px`;
  }, [songList]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <Scroll bounceTop={true}>
          <div>
            <section>
              <Swiper
                style={{
                  height: "140px"
                }}
                autoplay
                loop
              >
                {bannerList?.map((value, index) => {
                  return (
                    <Swiper.Item key={index}>
                      <div
                        className={"swiperItem"}
                        onClick={() => {
                          // TODO 跳转链接
                          console.log(value.typeTitle);
                        }}
                      >
                        <Image src={value.imageUrl} alt={value.typeTitle} />
                      </div>
                    </Swiper.Item>
                  );
                })}
              </Swiper>
            </section>
            <section>
              <h1 className={styles.title}>推荐歌单</h1>
              <Scroll direction={"horizontal"}>
                <ul ref={categoryRef} className={styles.songListWrapper}>
                  {songList.length &&
                    songList?.map(value => {
                      return (
                        <li className={styles.songList} key={value.id}>
                          <Image
                            lazy
                            src={`${value.picUrl}?param=150y150`}
                            style={{ width: 105, height: 105 }}
                          />
                          <p>{value.name}</p>
                        </li>
                      );
                    })}
                </ul>
              </Scroll>
            </section>
            <section>
              <h1 className={styles.tuneListTitle}>推荐歌曲</h1>
              {newsongList.length &&
                newsongList?.map((value: any, index) => {
                  return (
                    <div
                      className={styles.tuneList}
                      key={value.id}
                      id={String(value.id)}
                      onClick={e => {
                        e.preventDefault();
                        // const id = Number(e.currentTarget.id);
                        // goToId(id);
                        dispatch(changePlayList(newsongList));
                        dispatch(changeCurrentIndex(index));
                        dispatch(changeSequencePlayList(newsongList));
                      }}
                    >
                      <p className={styles.tuneListLeft}>
                        <span>{index + 1}</span>
                        <span>{value.name}</span>
                      </p>
                      <div className={styles.tuneListRight}>{value?.ar[0].name}</div>
                    </div>
                  );
                })}
            </section>
          </div>
        </Scroll>
      </div>
    </>
  );
};
export default Recommend;
