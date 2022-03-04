import { getSingerListRequest, getSongDetailRequest } from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex, playMode } from "@/utils";
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
  currentSong: {} as CurrentSong
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
    changeSequencePlayList: (state, action: PayloadAction<any[]>) => {
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
    const data = await getSongDetailRequest(id);
    const song = data.songs[0];
    dispatch(insertSong(song));
  } catch {
    return "获取失败";
  }
};

export const insertSong = (song: any) => (dispatch: any, getState: any) => {
  const oldPlayList = JSON.parse(JSON.stringify(getState().player.playList));
  const oldSequenceList = JSON.parse(JSON.stringify(getState().player.sequencePlayList));
  let oldCurrentIndex = JSON.parse(JSON.stringify(getState().player.currentIndex));
  // 看看有没有同款
  const fpIndex = findIndex(song, oldPlayList);
  console.log("fpIndex::", fpIndex);
  console.log("oldCurrentIndex1", oldCurrentIndex);
  // 如果是当前歌曲直接不处理
  // if (fpIndex === oldCurrentIndex && oldCurrentIndex !== -1) return getState().player;
  if (fpIndex === oldCurrentIndex && oldCurrentIndex !== -1) return;
  oldCurrentIndex++;

  // 把歌放进去，放到当前播放曲目的下一个位置
  oldPlayList.splice(oldCurrentIndex, 0, song);
  // 如果列表中已经存在要添加的歌，暂且称它 oldSong
  if (fpIndex > -1) {
    // 如果 oldSong 的索引在目前播放歌曲的索引小，那么删除它，同时当前 index 要减一
    // 删掉之前的oldSong
    if (oldCurrentIndex > fpIndex) {
      oldPlayList.splice(fpIndex, 1);
      oldCurrentIndex--;
    } else {
      // 否则直接删掉 oldSong
      oldPlayList.splice(fpIndex + 1, 1);
    }
  }
  // 同理，处理 sequenceList
  let sequenceIndex = findIndex(oldPlayList[oldCurrentIndex], oldSequenceList) + 1;
  const fsIndex = findIndex(song, oldSequenceList);
  // 插入歌曲
  oldSequenceList.splice(sequenceIndex, 0, song);
  if (fsIndex > -1) {
    // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
    if (sequenceIndex > fsIndex) {
      oldSequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      oldSequenceList.splice(fsIndex + 1, 1);
    }
  }
  dispatch(changeCurrentIndex(oldCurrentIndex));
  dispatch(changePlayList(oldPlayList));
  dispatch(changeSequencePlayList(oldSequenceList));
};

export const deleteSong = (song: { id: any }) => (dispatch: any, getState: any) => {
  // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
  const oldPlayList = JSON.parse(JSON.stringify(getState().player.playList));
  const oldSequenceList = JSON.parse(JSON.stringify(getState().player.sequencePlayList));
  let oldCurrentIndex = JSON.parse(JSON.stringify(getState().player.currentIndex));
  // 找对应歌曲在播放列表中的索引

  const fpIndex = findIndex(song, oldPlayList);

  // 在播放列表中将其删除
  oldPlayList.splice(fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (fpIndex < oldCurrentIndex) oldCurrentIndex--;
  // 在 sequenceList 中直接删除歌曲即可
  const fsIndex = findIndex(song, oldSequenceList);
  oldSequenceList.splice(fsIndex, 1);

  dispatch(changeCurrentIndex(oldCurrentIndex));
  dispatch(changePlayList(oldPlayList));
  dispatch(changeSequencePlayList(oldSequenceList));
};

export const clearSongs = () => (dispatch: any) => {
  dispatch(changePlayList([]));
  dispatch(changeSequencePlayList([]));
  // 2. 初始 currentIndex
  dispatch(changeCurrentIndex(-1));
  // 3. 关闭 PlayList 的显示
  dispatch(changeShowPlayList(false));
  // 4. 将当前歌曲置空
  dispatch(changeCurrentSong({} as CurrentSong));
  // 5. 重置播放状态
  dispatch(changePlaying(false));
};

export const {
  changeShowPlayList,
  changeSequencePlayList,
  changePlayMode,
  changePlayList,
  changePlaying,
  changeCurrentIndex,
  changeCurrentSong,
  changeFllScreen
} = playerSlice.actions;

export default playerSlice.reducer;
