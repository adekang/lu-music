import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import "./index.scss";
import SvgIcon from "@/components/svgIcon";
import { changePlaying, getSongDetail } from "@/store/playerSlice";
import { getSongUrl } from "@/services/comment";
import { getName } from "@/utils";

export interface CurrentSong {
  id: number;
}

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
  const audioRef = useRef<any>();
  const [AcurrentSong, setCurrentSing] = useState<any>({
    name: "嚣张",
    ar: [{ name: "1323" }]
  });

  useEffect(() => {
    audioRef.current.src = getSongUrl(currentSong.id);
    audioRef.current.play();
  }, [playing, currentSong]);

  useEffect(() => {
    dispatch(getSongDetail(currentSong.id)).then((data: any) => {
      setCurrentSing(data.songs[0]);
    });
  }, [currentSong]);

  useEffect(() => {
    console.log("playing::", playing);
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  console.log(AcurrentSong);

  const handleEnd = () => {
    console.log("handleEnd");
  };
  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };
  const handleError = () => {
    console.log("handleError");
  };

  const ChangePlay = () => {
    dispatch(changePlaying(!playing));
  };

  return (
    <>
      <div className="PlayerWrapper">
        <audio ref={audioRef} onEnded={handleEnd} onTimeUpdate={updateTime} onError={handleError} />
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
          <h2 className="name">{AcurrentSong?.name || "测试"}</h2>
          <p className="desc">{"测试测试" || getName(AcurrentSong?.ar)}</p>
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
    </>
  );
};

export default Player;
