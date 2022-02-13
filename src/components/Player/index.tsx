import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import "./index.scss";
import SvgIcon from "@/components/svgIcon";
import { changePlaying } from "@/store/playerSlice";

const Player: React.FC = () => {
  const dispatch = useAppDispatch();

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  // let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  const {
    playing,
    currentSong,
    showPlayList,
    currentIndex,
    playList,
    mode,
    sequencePlayList,
    fullScreen
  } = useSelector((state: RootState) => state.player);

  console.log(currentSong);
  const ChangePlay = () => {
    dispatch(changePlaying(!playing));
  };

  return (
    <div className="PlayerWrapper">
      <div className={"imgWrapper"}>
        <img
          className={`play ${playing ? "" : "pause"}`}
          src={
            "https://p2.music.126.net/dNiwNZZVX_41Pm3K33OTLg==/109951165370690519.jpg?param=150y150"
          }
        />
      </div>
      <div className="text">
        <h2 className="name">{"我和你"}</h2>
        <p className="desc">
          {
            "缓解焦虑/午睡/学习/中高考/催眠曲/文理科缓解焦虑/午睡/学习/中高考/催眠曲/文理科缓解焦虑/午睡/学习/中高考/催眠曲/文理科缓解焦虑/午睡/学习/中高考/催眠曲/文理科缓解焦虑/午睡/学习/中高考/催眠曲/文理科缓解焦虑/午睡/学习/中高考/催眠曲/文理科缓解焦虑/午睡/学习/中高考/催眠曲/文理科"
          }
        </p>
      </div>
      <div className="control" onClick={ChangePlay}>
        {playing ? (
          <div>
            <SvgIcon iconClass={"play"} fontSize="24px" className="formatSvg" />
          </div>
        ) : (
          <div>
            <SvgIcon iconClass={"pose"} fontSize="24px" className="formatSvg" />
          </div>
        )}
      </div>
      <div className="control">
        <SvgIcon iconClass={"playlist"} fontSize="24px" className={"formatSvg"} />
      </div>
    </div>
  );
};

export default Player;
