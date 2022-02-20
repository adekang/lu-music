import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import "./index.scss";
import SvgIcon from "@/components/svgIcon";
import { getName } from "@/utils";
import { CSSTransition } from "react-transition-group";

// Icon ，命名相反了

export interface Props {
  song: { al: { picUrl: string }; name: string; ar: any };
  fullScreen?: boolean;
  playing: boolean;
  toggleFullScreen?: (state: boolean) => void;
  clickPlaying?: (e: any, state: boolean) => void;
  percent?: number;
  changePlayListDispatch?: boolean;
  togglePlayList?: any;
}

const MiniPlayer: React.FC<Props> = props => {
  const { playing, song, fullScreen, clickPlaying, toggleFullScreen } = props;
  const miniPlayerRef = useRef<any>();

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
            <img className={`play ${playing ? "" : "pause"}`} src={song.al.picUrl} alt="属性" />
          </div>
          <div className="text">
            <h2 className="name">{song?.name || "测试"}</h2>
            <p className="desc">{getName(song?.ar) || "测试测试"}</p>
          </div>
          <div className="control">
            {playing ? (
              <SvgIcon
                iconClass={"pose"}
                fontSize="24px"
                className="formatSvg"
                onClick={e => clickPlaying?.(e, false)}
              />
            ) : (
              <SvgIcon
                iconClass={"play"}
                fontSize="24px"
                className="formatSvg"
                onClick={e => clickPlaying?.(e, true)}
              />
            )}
          </div>
          <div className="control">
            <SvgIcon iconClass={"playlist"} fontSize="24px" className={"formatSvg"} />
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default MiniPlayer;
