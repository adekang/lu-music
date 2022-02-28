import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFllScreen,
  changePlaying,
  changePlayList,
  changePlayMode,
  getSongDetail
} from "@/store/playerSlice";
import { getSongUrl } from "@/services/comment";
import { findIndex, isEmptyObject, playMode, shuffle } from '@/utils'
import MiniPlayer from "@/components/Player/MiniPlayer";
import "./index.scss";
import NormalPlayer from "@/components/Player/NormalPlayer";
import { Toast } from "antd-mobile";

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

// mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
const playList = [
  {
    ftype: 0,
    djId: 0,
    a: null,
    cd: "01",
    crbt: null,
    no: 1,
    st: 0,
    rt: "",
    cf: "",
    alia: ["手游《梦幻花园》苏州园林版推广曲"],
    rtUrls: [],
    fee: 0,
    s_id: 0,
    copyright: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9400365,
      vd: -45814
    },
    mv: 0,
    al: {
      id: 84991301,
      name: "拾梦纪",
      picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
      tns: [],
      pic_str: "109951164627180052",
      pic: 109951164627180050
    },
    name: "拾梦纪",
    l: {
      br: 128000,
      fid: 0,
      size: 3760173,
      vd: -41672
    },
    rtype: 0,
    m: {
      br: 192000,
      fid: 0,
      size: 5640237,
      vd: -43277
    },
    cp: 1416668,
    mark: 0,
    rtUrl: null,
    mst: 9,
    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: "妖扬",
        tns: [],
        alias: []
      },
      {
        id: 12578371,
        name: "金天",
        tns: [],
        alias: []
      }
    ],
    pop: 5,
    pst: 0,
    t: 0,
    v: 3,
    id: 1416767593,
    publishTime: 0,
    rurl: null
  }
];

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
    // playList,
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
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      // 注意，play 方法返回的是一个 promise 对象
      audioRef.current.play ().then (() => {
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
          />
        )}
        <audio ref={audioRef} onEnded={handleEnd} onTimeUpdate={updateTime} onError={handleError} />
      </div>
    </>
  );
};

export default Player;
