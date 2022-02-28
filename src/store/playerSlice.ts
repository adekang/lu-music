import { getSingerListRequest, getSongDetailRequest } from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { playMode } from "@/utils";
import { CurrentSong } from "@/components/Player";

interface PlayerState {
  playing: boolean;
  currentSong: CurrentSong;
  showPlayList: boolean;
  currentIndex: number;
  playList: any[];
  mode: number;
  sequencePlayList: string[];
  fullScreen: boolean;
}

const initialState: PlayerState = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {
    id: -1,
    al: {
      picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg"
    },
    name: "拾梦纪",
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
    ]
  }
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSong: (state, action: PayloadAction<CurrentSong>) => {
      state.currentSong = action.payload;
    },
    changeFllScreen: (state, action: PayloadAction<boolean>) => {
      state.fullScreen = action.payload;
    },
    changePlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    changeShowPlayList: (state, action: PayloadAction<boolean>) => {
      state.showPlayList = action.payload;
    },
    changeCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    changePlayMode: (state, action: PayloadAction<number>) => {
      state.mode = action.payload;
    },
    changePlayList: (state, action: PayloadAction<any>) => {
      state.playList = action.payload;
    },
    changeSequencePlayList: (state, action: PayloadAction<string[]>) => {
      state.sequencePlayList = action.payload;
    }
  }
});

export const getSingerList = (category: string, alpha: string) => async (dispatch: any) => {
  try {
    const res = await getSingerListRequest(category, alpha, 0);
    // dispatch(changeSingerList(res.artists));
    return "歌手数据成功";
  } catch {
    return "歌手数据获取失败";
  }
};

export const getSongDetail = (id: number) => async (dispatch: any, getState: any) => {
  try {
    return await getSongDetailRequest(id);
  } catch {
    return "获取失败";
  }
};

export const { changePlayList,changePlaying, changeCurrentIndex, changeCurrentSong, changeFllScreen } =
  playerSlice.actions;

export default playerSlice.reducer;
