import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { CSSTransition } from "react-transition-group";
import { findIndex, getName, playMode, prefixStyle, shuffle } from "@/utils";
import Scroll from "../Scroll";
import {
  changeCurrentIndex,
  changePlaying,
  changePlayList,
  changePlayMode,
  changeShowPlayList,
  clearSongs,
  deleteSong
} from "@/store/playerSlice";
import Confirm from "@/components/Confirm";

const PlayList: React.FC = () => {
  const { showPlayList, mode, currentSong, currentIndex, playList, sequencePlayList } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useAppDispatch();
  const [canTouch, setCanTouch] = useState(true);
  // touchStart后记录y值
  const [startY, setStartY] = useState(0);
  // touchStart事件是否已经被触发
  const [initialed, setInitialed] = useState<boolean>(false);
  // 用户下滑的距离
  const [isShow, setIsShow] = useState(false);
  const [distance, setDistance] = useState(0);

  const listContentRef = useRef<any>();
  const confirmRef = useRef<any>();
  const playListRef = useRef<any>();
  const listWrapperRef = useRef<any>();
  const transform = prefixStyle("transform");

  // 动画
  const onEnterCB = useCallback(() => {
    //让列表显示
    setIsShow(true);
    //最开始是隐藏在下面
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);
  const onEnteringCB = useCallback(() => {
    //让列表展现
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);
  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);
  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const getCurrentIcon = (item: any) => {
    //是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? "icon-play" : "";
    const content = current ? "&#xe6e3;" : "";
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={e => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <span className="text" onClick={e => changeMode(e)}>
          {text}
        </span>
      </div>
    );
  };

  const changeMode = (e: any) => {
    const newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      dispatch(changePlayList(sequencePlayList));
      const index = findIndex(currentSong, sequencePlayList);
      dispatch(changeCurrentIndex(index));
    } else if (newMode === 1) {
      //单曲循环
      dispatch(changePlayList(sequencePlayList));
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      dispatch(changePlayList(newList));
      dispatch(changeCurrentIndex(index));
    }
    dispatch(changePlayMode(newMode));
  };

  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) return;
    dispatch(changeCurrentIndex(index));
  };

  const handleDeleteSong = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, song: any) => {
    e.stopPropagation();
    dispatch(deleteSong(song));
  };

  const handleShowClear = () => {
    confirmRef.current.show();
  };

  const handleConfirmClear = () => {
    dispatch(clearSongs());
  };

  const handleScroll = (pos: { y: number }) => {
    //只有当内容偏移量为0的时候才能下滑关闭PlayList。否则一边内容在移动，一边列表在移动，出现bug
    const state = pos.y === 0;
    setCanTouch(state);
  };
  // 下滑关闭及反弹效果
  const handleTouchStart = (e: any) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current.style["transition"] = "";
    setStartY(e.nativeEvent.touches[0].pageY); //记录y值
    setInitialed(true);
  };

  const handleTouchMove = (e: any) => {
    if (!canTouch || !initialed) return;
    const distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance); //记录下滑距离
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
  };

  const handleTouchEnd = () => {
    setInitialed(false);
    //这里设置阈值为150px
    if (distance >= 150) {
      //大于150px则关闭PlayList
      dispatch(changeShowPlayList(false));
    } else {
      //否则反弹回去
      listWrapperRef.current.style["transition"] = "all 0.3s";
      listWrapperRef.current.style[transform] = `translate3d(0px, 0px, 0px)`;
    }
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <div
        className="PlayListWrapper"
        ref={playListRef}
        style={isShow ? { display: "block" } : { display: "none" }}
        onClick={() => dispatch(changeShowPlayList(false))}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="ListHeader">
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span>
            </h1>
          </div>
          <div className="ScrollWrapper">
            <Scroll ref={listContentRef} onScroll={pos => handleScroll(pos)} bounceTop={false}>
              <div className="ListContent">
                {playList.length &&
                  playList.map((item: any, index: number) => {
                    return (
                      <li
                        className="item"
                        key={item.id}
                        onClick={() => handleChangeCurrentIndex(index)}
                      >
                        {getCurrentIcon(item)}
                        <span className="text">
                          {item.name} - {getName(item.ar)}
                        </span>
                        <span className="like">
                          <i className="iconfont">&#xe601;</i>
                        </span>
                        <span className="delete" onClick={e => handleDeleteSong(e, item)}>
                          <i className="iconfont">&#xe63d;</i>
                        </span>
                      </li>
                    );
                  })}
              </div>
            </Scroll>
          </div>
          <Confirm
            ref={confirmRef}
            text={"是否删除全部？"}
            cancelBtnText={"取消"}
            confirmBtnText={"确定"}
            handleConfirm={handleConfirmClear}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default PlayList;
