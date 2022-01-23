import React, { FC, useCallback, useEffect, useState } from "react";
import { getBannerRequest, getHotList, getNewSong, getSingSongDetail } from "@/services/comment";
import { Image, Swiper } from "antd-mobile";
import { BannerList, SongList } from "@/pages/Recommend/types";
import styles from "./recommend.module.scss";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {
  name?: string;
}

const Recommend: FC<Props> = props => {
  const [bannerList, setBannerList] = useState<BannerList[]>();
  const [songList, setSongList] = useState<SongList[]>();
  const [newsongList, setNewSongList] = useState<SongList[]>();

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
    getNewSong()
      .then((data: { result: never }) => {
        const { result } = data;
        setNewSongList(result);
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  }, []);

  const [songUrl, setSongUrl] = useState<string>();
  const [isSongChange, setIsSongChange] = useState(false);

  const getSongUrl = (id: number) => {
    setIsSongChange(false);
    getSingSongDetail({ id }).then((data: { data: { url: string }[] }) => {
      const { data: res } = data;
      res.length && setSongUrl(res[0]?.url);
      setIsSongChange(true);
    });
  };

  return (
    <>
      <div>
        <section>
          <Swiper autoplay loop>
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
          <h1 className={styles.title}>推荐歌单{">>"}</h1>
          <div className={styles.songListWrapper}>
            {songList?.map(value => {
              return (
                <div className={styles.songList} key={value.id}>
                  <Image
                    lazy
                    src={`${value.picUrl}?param=150y150`}
                    style={{ width: 105, height: 105 }}
                  />
                  <p>{value.name}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h1 className={styles.tuneListTitle}>推荐歌曲</h1>
          {newsongList?.map(value => {
            return (
              <div
                className={styles.tuneList}
                key={value.id}
                id={String(value.id)}
                onClick={e => {
                  e.preventDefault();
                  const id = Number(e.currentTarget.id);
                  getSongUrl(id);
                  goToId(id);
                }}
              >
                <div className={styles.tuneListLeft}>
                  <Image lazy src={`${value.picUrl}?param=45y45`} className={styles.img} />
                  <p>{value.name}</p>
                </div>
                <div className={styles.tuneListRight}>---</div>
              </div>
            );
          })}
        </section>
        {songUrl && isSongChange && (
          <section>
            <audio controls>
              <source src={songUrl} type="audio/mpeg" />
            </audio>
          </section>
        )}
      </div>
    </>
  );
};
export default Recommend;
