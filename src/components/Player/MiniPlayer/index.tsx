import React, { FC, memo, useEffect, useRef, useState } from "react";
import "./index.scss";
import SvgIcon from "@/components/svgIcon";
import { getName } from "@/utils";
import { CSSTransition } from "react-transition-group";
// import { ProgressCircle } from "antd-mobile";
import ProgressCircle from "@/components/ProgressCircle";
import { changePlayList, changePlayMode, changeShowPlayList } from "@/store/playerSlice";
import { useAppDispatch } from "@/store";

// Icon ，命名相反了
interface Props {
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
  percent: number;
  showPlayList: boolean;
  // togglePlayList: () => void;
}

const MiniPlayer: React.FC<Props> = props => {
  const { percent, playing, song, fullScreen, clickPlaying, toggleFullScreen } = props;
  const miniPlayerRef = useRef<any>();
  const dispatch = useAppDispatch();

  const handleTogglePlayList = (e: { stopPropagation: () => void }) => {
    dispatch(changeShowPlayList(true));
    e.stopPropagation();
  };

  return (
    <>
      <CSSTransition
        in={!fullScreen}
        timeout={400}
        classNames="mini"
        onEnter={() => {
          miniPlayerRef.current.style.display = "flex";
        }}
        onExited={() => {
          miniPlayerRef.current.style.display = "none";
        }}
      >
        <div
          className="MiniPlayerWrapper"
          ref={miniPlayerRef}
          onClick={() => toggleFullScreen?.(true)}
        >
          <div className={"imgWrapper"}>
            <img
              className={`play ${playing ? "" : "pause"}`}
              src={song?.picUrl || song.al.picUrl + "?param=100x100"}
              alt="属性"
            />
          </div>
          <div className="text">
            <h2 className="name">{song?.name || "测试"}</h2>
            <p className="desc">{getName(song?.ar) || "测试测试"}</p>
          </div>
          <div className="control">
            <ProgressCircle radius={32} percent={percent}>
              {playing ? (
                <SvgIcon
                  iconClass={"pose"}
                  fontSize="18px"
                  className="formatSvg player"
                  onClick={e => clickPlaying?.(e, false)}
                />
              ) : (
                <SvgIcon
                  iconClass={"play"}
                  fontSize="18px"
                  className="formatSvg player"
                  onClick={e => clickPlaying?.(e, true)}
                />
              )}
            </ProgressCircle>
          </div>
          <div className="control" onClick={handleTogglePlayList}>
            <SvgIcon iconClass={"playlist"} fontSize="24px" className={"formatSvg"} />
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default memo(MiniPlayer);
