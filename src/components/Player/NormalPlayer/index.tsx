import React, { FC, useEffect, useRef, useState } from "react";
import "./index.scss";
import { getName } from "@/utils";

export interface Props {
  song: { al: { picUrl: string }; name: string; ar: any };
  fullScreen?: boolean;
  playing?: boolean;
  toggleFullScreen?: (state:boolean) => void;
}

const Player: React.FC<Props> = props => {
  const { song ,toggleFullScreen} = props;

  return (
    <>
      <div className="NormalPlayerWrapper">
        <div className="background">
          <img src={song.al.picUrl + "?param=300x300"} width="100%" height="100%" alt="歌曲图片" />
        </div>
        <div className="background layer" />
        <div className="Top">
          <div className="back" onClick={()=>toggleFullScreen?.(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </div>
        <div className="Middle">
          <div className="CDWrapper">
            <div className="cd">
              <img className="image play" src={song.al.picUrl + "?param=400x400"} alt="" />
            </div>
          </div>
        </div>
        <div className="Bottom">
          <div className="Operators">
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
