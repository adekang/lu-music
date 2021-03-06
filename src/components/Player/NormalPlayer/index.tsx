import React, { memo, useEffect, useRef, useState } from "react";
import "./index.scss";
import { formatPlayTime, getName, playMode, prefixStyle } from "@/utils";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import ProgressBar from "@/components/ProgressBar";
import { useAppDispatch } from "@/store";
import { changeShowPlayList } from "@/store/playerSlice";
import Scroll from "@/components/Scroll";
import needle from "../../../assets/needle.png";
import disc from "../../../assets/disc.png";

export interface PlayerProps {
  song: {
    picUrl?: string;
    al: { picUrl: string };
    name: string;
    ar: any;
  };
  fullScreen?: boolean;
  playing: boolean;
  toggleFullScreen?: (state: boolean) => void;
  clickPlaying?: (e: any, state: boolean) => void;
  togglePlayList?: any;
  percent: number;
  duration: number; //总时长
  currentTime: number; //播放时间
  onProgressChange: (t: number) => void;
  handlePrev?: () => void;
  handleNext?: () => void;
  mode: number;
  changeMode: () => void;
  showPlayList: boolean;
  currentLyric: any;
  currentPlayingLyric: string;
  currentLineNum: number;
}

const NormalPlayer: React.FC<PlayerProps> = props => {
  const {
    currentLineNum,
    currentPlayingLyric,
    currentLyric,
    playing,
    mode,
    song,
    percent,
    fullScreen,
    currentTime,
    duration
  } = props;
  const { changeMode, clickPlaying, toggleFullScreen, onProgressChange, handlePrev, handleNext } =
    props;

  const normalPlayerRef = useRef<any>();
  const cdWrapperRef = useRef<any>();
  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale
    };
  };
  const transform = prefixStyle("transform");
  const dispatch = useAppDispatch();

  const handleTogglePlayList = (e: { stopPropagation: () => void }) => {
    dispatch(changeShowPlayList(true));
    e.stopPropagation();
  };
  // 启用帧动画
  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale(); // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };
  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };
  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };
  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = "";
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = "none";
    setCurrentState("");
  };

  //getPlayMode方法
  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
    } else {
      content = "&#xe61b;";
    }
    return content;
  };

  const [currentState, setCurrentState] = useState<"" | "lyric">("");
  // const currentState = useRef<"" | "lyric">("");
  const lyricScrollRef = useRef<any>();
  const lyricLineRefs = useRef<any>([]);

  const toggleLyricShow = () => {
    let nextState: "" | "lyric" = "";
    if (currentState !== "lyric") {
      nextState = "lyric";
    } else {
      nextState = "";
    }
    setCurrentState(nextState);
  };

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    const bScroll = lyricScrollRef.current.getBScroll();
    if (currentLineNum > 5) {
      // 保持当前歌词在第 5 条的位置
      const lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

  return (
    <>
      <CSSTransition
        classNames="normal"
        in={fullScreen}
        timeout={400}
        mountOnEnter
        onEnter={enter}
        onEntered={afterEnter}
        onExit={leave}
        onExited={afterLeave}
      >
        <div className="NormalPlayerWrapper" ref={normalPlayerRef}>
          <div className="background">
            <img
              src={song?.picUrl || song.al.picUrl + "?param=300x300"}
              width="100%"
              height="100%"
              alt="歌曲图片"
            />
          </div>
          <div className="background layer" />
          <div className="Top">
            <div className="back" onClick={() => toggleFullScreen?.(false)}>
              <i className="iconfont icon-back">&#xe662;</i>
            </div>
            <div className="text">
              <h1 className="title">{song.name}</h1>
              <h1 className="subtitle">{getName(song.ar)}</h1>
            </div>
          </div>
          <div className="Middle" ref={cdWrapperRef} onClick={toggleLyricShow}>
            <CSSTransition timeout={400} classNames="fade" in={currentState !== "lyric"}>
              <div
                className="CDWrapper"
                style={{
                  visibility: currentState === "lyric" ? "hidden" : "visible"
                }}
              >
                <div
                  className={`needle ${playing ? "" : "pause"}`}
                  style={{
                    backgroundImage: `url(${needle})`
                  }}
                />
                <div
                  className="cd"
                  style={{
                    backgroundImage: `url(${disc})`
                  }}
                >
                  <img
                    className={`image play ${playing ? "" : "pause"}`}
                    src={song?.picUrl || song.al.picUrl + "?param=400x400"}
                    alt="歌曲图片"
                  />
                </div>
                <p className="playing_lyric">{currentPlayingLyric}</p>
              </div>
            </CSSTransition>
            <CSSTransition timeout={400} classNames="fade" in={currentState === "lyric"}>
              <div className="LyricContainer">
                <Scroll ref={lyricScrollRef}>
                  <div
                    className="LyricWrapper lyric_wrapper"
                    style={{
                      visibility: currentState === "lyric" ? "visible" : "hidden"
                    }}
                  >
                    {currentLyric ? (
                      currentLyric.lines.map((item: any, index: any) => {
                        lyricLineRefs.current[index] = React.createRef();
                        return (
                          <p
                            className={`text ${currentLineNum === index ? "current" : ""}`}
                            key={item + index}
                            ref={lyricLineRefs.current[index]}
                          >
                            {item.txt}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text pure">纯音乐，请欣赏。</p>
                    )}
                  </div>
                </Scroll>
              </div>
            </CSSTransition>
          </div>
          <div className="Bottom">
            <div className="ProgressWrapper">
              <span className="time time-l">{formatPlayTime(currentTime)}</span>
              <div className="progress-bar-wrapper">
                <ProgressBar percent={percent} percentChange={onProgressChange} />
              </div>
              <div className="time time-r">{formatPlayTime(duration)}</div>
            </div>
            <div className="Operators">
              <div className="icon i-left" onClick={changeMode}>
                <i className="iconfont" dangerouslySetInnerHTML={{ __html: getPlayMode() }} />
              </div>
              <div className="icon i-left" onClick={handlePrev}>
                <i className="iconfont">
                  <i className="iconfont">&#xe6e1;</i>
                </i>
              </div>
              <div className="icon i-center">
                <i
                  className="iconfont"
                  onClick={e => clickPlaying?.(e, !playing)}
                  dangerouslySetInnerHTML={{
                    __html: playing ? "&#xe723;" : "&#xe731;"
                  }}
                />
              </div>
              <div className="icon i-right" onClick={handleNext}>
                <i className="iconfont">&#xe718;</i>
              </div>
              <div className="icon i-right" onClick={handleTogglePlayList}>
                <i className="iconfont">&#xe640;</i>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default memo(NormalPlayer);
