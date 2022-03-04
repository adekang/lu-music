import {
  getBannerRequest,
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestListRequest
} from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface hotListProps {
  first: string;
}

interface songsListProps {
  id: number;
  name: string;
  artists: any;
  album: {
    name: string;
  };
}

interface playlistsProps {
  accountId: string;
  id: number;
  coverImgUrl: string | undefined;
  name: string;
}

interface artistListProps {
  accountId: string;
  id: number;
  picUrl: string | undefined;
  name: string;
}

interface SuggestListProps {
  playlists: playlistsProps[];
  artists: artistListProps[];
}

export interface SearchState {
  hotList: hotListProps[]; // 热门关键词列表
  suggestList: SuggestListProps; // 列表，包括歌单和歌手
  songsList: songsListProps[]; // 歌曲列表
  enterLoading: boolean;
}

const initialState: SearchState = {
  hotList: [], // 热门关键词列表
  suggestList: {} as SuggestListProps, // 列表，包括歌单和歌手
  songsList: [], // 歌曲列表
  enterLoading: false
};

export const searchSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeHotList: (state, action: PayloadAction<any>) => {
      state.hotList = action.payload;
    },
    changeSuggestList: (state, action: PayloadAction<any>) => {
      state.suggestList = action.payload;
    },
    changeSongsList: (state, action: PayloadAction<any>) => {
      state.songsList = action.payload;
    },
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    }
  }
});
export const getHotKeyWords = () => (dispatch: any) => {
  getHotKeyWordsRequest().then((data: { result: { hots: any } }) => {
    // 拿到关键词列表
    const list = data.result.hots;
    dispatch(changeHotList(list));
  });
};
export const getSuggestList = (query: string) => {
  return (dispatch: any) => {
    getSuggestListRequest(query).then((data: { result: never[] }) => {
      if (!data) return;
      const res = data.result || [];
      dispatch(changeSuggestList(res));
    });
    getResultSongsListRequest(query).then((data: { result: { songs: never[] } }) => {
      if (!data) return;
      const res = data.result.songs || [];
      dispatch(changeSongsList(res));
      dispatch(changeEnterLoading(false)); // 关闭 loading
    });
  };
};

// Action creators are generated for each case reducer function
export const { changeEnterLoading, changeHotList, changeSongsList, changeSuggestList } =
  searchSlice.actions;

export default searchSlice.reducer;
