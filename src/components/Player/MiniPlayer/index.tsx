import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import "./index.scss";
import SvgIcon from "@/components/svgIcon";
import { getName } from "@/utils";

// Icon ，命名相反了

export interface Props {
  song: { name: string; ar: any };
  fullScreen?: boolean;
  playing: boolean;
  toggleFullScreen?: (state: boolean) => void;
  clickPlaying?: (e: any, state: boolean) => void;
  percent?: number;
  changePlayListDispatch?: boolean;
  togglePlayList?: any;
}

const MiniPlayer: React.FC<Props> = props => {
  const { playing, song, clickPlaying, toggleFullScreen } = props;
  return (
    <>
      <div className="MiniPlayerWrapper" onClick={() => toggleFullScreen?.(true)}>
        <div className={"imgWrapper"}>
          <img
            className={`play ${playing ? "" : "pause"}`}
            src={
              "https://p2.music.126.net/dNiwNZZVX_41Pm3K33OTLg==/109951165370690519.jpg?param=150y150"
            }
            alt="属性"
          />
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
    </>
  );
};

export default MiniPlayer;
