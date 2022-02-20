import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { changeFllScreen, changePlaying, getSongDetail } from "@/store/playerSlice";
import { getSongUrl } from "@/services/comment";
import { isEmptyObject } from "@/utils";
import MiniPlayer from "@/components/Player/MiniPlayer";
import "./index.scss";
import NormalPlayer from "@/components/Player/NormalPlayer";

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
  const [CurrentSong, setCurrentSing] = useState<any>({});

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

  const handleEnd = () => {
    console.log("handleEnd");
  };
  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };
  const handleError = () => {
    console.log("handleError");
  };

  const clickPlaying = (e: any, state: boolean) => {
    e.stopPropagation();
    dispatch(changePlaying(state));
  };

  const toggleFullScreen = (state: boolean) => {
    dispatch(changeFllScreen(state));
  };

  return (
    <>
      <div className="PlayerWrapper">
        {isEmptyObject(CurrentSong) ? null : (
          <NormalPlayer
            song={CurrentSong}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreen}
          />
        )}
        {isEmptyObject(CurrentSong) ? null : (
          <MiniPlayer
            song={CurrentSong}
            toggleFullScreen={toggleFullScreen}
            fullScreen={fullScreen}
            playing={playing}
            clickPlaying={clickPlaying}
          />
        )}
      </div>
      <audio ref={audioRef} onEnded={handleEnd} onTimeUpdate={updateTime} onError={handleError} />
    </>
  );
};

export default Player;
