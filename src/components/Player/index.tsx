import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFllScreen,
  changePlaying,
  changePlayList,
  changePlayMode
} from "@/store/playerSlice";
import { getSongUrl } from "@/services/comment";
import { findIndex, isEmptyObject, playMode, shuffle } from "@/utils";
import MiniPlayer from "@/components/Player/MiniPlayer";
import "./index.scss";
import NormalPlayer from "@/components/Player/NormalPlayer";
import { Toast } from "antd-mobile";
import PlayList from "@/components/PlayList";

Toast.config({
  duration: 250,
  position: "bottom",
  maskClickable: false
});

export interface CurrentSong {
  id: number;
  al: { picUrl: string };
  name: string;
  ar: any;
}

const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState<any>({});
  const songReady = useRef<any>(true);

  const {
    playing,
    currentSong,
    showPlayList,
    currentIndex,
    playList,
    mode,
    sequencePlayList,
    fullScreen
  } = useSelector((state: RootState) => {
    return state.player;
  });
  const audioRef = useRef<any>();

  //先mock一份currentIndex
  useEffect(() => {
    dispatch(changeCurrentIndex(0));
  }, []);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady
    )
      return;
    const current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current);
    songReady.current = false; // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      // 注意，play 方法返回的是一个 promise 对象
      audioRef.current.play().then(() => {
        songReady.current = true;
      });
    });
    dispatch(changePlaying(true));
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [playList, playing, currentIndex]);

  useEffect(() => {
    console.log("playing::", playing);
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };
  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };
  const handleError = () => {
    songReady.current = true;
    alert("播放出错");
  };

  const clickPlaying = (e: any, state: boolean) => {
    e.stopPropagation();
    dispatch(changePlaying(state));
  };

  const toggleFullScreen = (state: boolean) => {
    dispatch(changeFllScreen(state));
  };

  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(changePlaying(true));
    }
  };

  // 歌曲切换逻辑
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlaying(true));
    audioRef.current.play();
  };
  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(changePlaying(true));
    dispatch(changeCurrentIndex(index));
  };
  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(changePlaying(true));
    dispatch(changeCurrentIndex(index));
  };

  const changeMode = () => {
    const newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      dispatch(changePlayList(sequencePlayList));
      const index = findIndex(currentSong, sequencePlayList);
      dispatch(changeCurrentIndex(index));
      Toast.show({
        content: "顺序循环"
      });
    } else if (newMode === 1) {
      dispatch(changePlayList(sequencePlayList));
      Toast.show({
        content: "单曲循环"
      });
    } else if (newMode === 2) {
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      dispatch(changePlayList(sequencePlayList));
      dispatch(changeCurrentIndex(index));
      Toast.show({
        content: "随机播放"
      });
    }
    dispatch(changePlayMode(newMode));
  };

  //歌曲播放进度
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  return (
    <>
      <div>
        {isEmptyObject(currentSong) ? null : (
          <NormalPlayer
            song={currentSong}
            toggleFullScreen={toggleFullScreen}
            fullScreen={fullScreen}
            playing={playing}
            clickPlaying={clickPlaying}
            duration={duration}
            currentTime={currentTime}
            onProgressChange={onProgressChange}
            percent={percent}
            handlePrev={handlePrev}
            handleNext={handleNext}
            mode={mode}
            changeMode={changeMode}
            showPlayList={showPlayList}
          />
        )}
        {isEmptyObject(currentSong) ? null : (
          <MiniPlayer
            song={currentSong}
            toggleFullScreen={toggleFullScreen}
            fullScreen={fullScreen}
            playing={playing}
            clickPlaying={clickPlaying}
            percent={percent}
            showPlayList={showPlayList}
          />
        )}
        <audio ref={audioRef} onEnded={handleEnd} onTimeUpdate={updateTime} onError={handleError} />
        <PlayList />
      </div>
    </>
  );
};

export default Player;
