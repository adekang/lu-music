import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCount, HEADER_HEIGHT, isEmptyObject } from "@/utils";
import Scroll from "@/components/Scroll";
import { CSSTransition } from "react-transition-group";
import SongsList from "@/components/SongsList";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { getAlbumDetailRequest } from "@/services/comment";
import "./index.scss";

const Album: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);
  const [title, setTitle] = useState("歌单");
  const [currentAlbum, setCurrentAlbum] = useState<any>();
  const [enterLoading, setEnterLoading] = useState<any>(true);

  const headerEl = useRef<any>();

  useEffect(() => {
    getAlbumDetailRequest(Number(id))
      .then((res: any) => {
        const data = res.playlist;
        setCurrentAlbum(data);
        setEnterLoading(false);
      })
      .catch((err: any) => {
        setEnterLoading(false);
        return err;
      });
  }, [id]);
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    pos => {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDom = headerEl.current;
      //滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = "#d44439";
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );
  const renderTopDesc = () => {
    return (
      <div
        className="AlbumTopDesc"
        style={{
          background: `url(${currentAlbum.coverImgUrl}),no-repeat`
        }}
      >
        <div className="background">
          <div className="filter" />
        </div>
        <div className="img_wrapper">
          <div className="decorate" />
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className="AlbumMenu">
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </div>
    );
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <div className="AlbumContainer">
        <Header ref={headerEl} title={title} onClose={handleBack} isMarquee={isMarquee} />
        <hr />
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              <SongsList
                songs={currentAlbum.tracks}
                collectCount={currentAlbum.subscribedCount}
                showCollect={true}
                showBackground={true}
              />
            </div>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
};

export default React.memo(Album);
