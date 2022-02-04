import {
  getBannerRequest,
  getHotSingerListRequest,
  getSingerListRequest
} from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SingersState {
  singerList: any;
  enterLoading: boolean; //控制进场Loading
  pullUpLoading: boolean; //控制上拉加载动画
  pullDownLoading: boolean; //控制下拉加载动画
  pageCount: number;
}

const initialState: SingersState = {
  singerList: [],
  enterLoading: true, //控制进场Loading
  pullUpLoading: false, //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0 //这里是当前页数，我们即将实现分页功能
};

export const singersSlice = createSlice({
  name: "singers",
  initialState,
  reducers: {
    changeSingerList: (state, action: PayloadAction<any>) => {
      state.singerList = action.payload;
    },
    changePageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    },
    changePullDownLoading: (state, action: PayloadAction<boolean>) => {
      state.pullDownLoading = action.payload;
    },
    changePullUpLoading: (state, action: PayloadAction<boolean>) => {
      state.pullUpLoading = action.payload;
    }
  }
});

export const getSingerList = (category: string, alpha: string) => async (dispatch: any) => {
  try {
    const res = await getSingerListRequest(category, alpha, 0);
    dispatch(changeSingerList(res.artists));
    dispatch(changeEnterLoading(false));
    dispatch(changePullUpLoading(false));
    dispatch(changePullDownLoading(false));
    return "歌手数据成功";
  } catch {
    return "歌手数据获取失败";
  }
};

export const refreshMoreSingerList =
  (category: string, alpha: string) => async (dispatch: any, getState: any) => {
    const oldSingersList = getState().singers.singerList;
    const pageCount = getState().singers.pageCount;
    try {
      const res = await getSingerListRequest(category, alpha, pageCount);
      const data = [...oldSingersList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullUpLoading(false));
      dispatch(changePullDownLoading(false));
      return "刷新成功";
    } catch {
      return "刷新失败";
    }
  };
export const getHotSingerList = () => async (dispatch: any) => {
  try {
    const res = await getHotSingerListRequest(0);
    const data = res.artists;
    dispatch(changeSingerList(data));
    dispatch(changeEnterLoading(false));
    dispatch(changePullUpLoading(false));
    dispatch(changePullDownLoading(false));
    return "歌手数据成功";
  } catch {
    return "热门歌手数据获取失败";
  }
};
//加载更多热门歌手
export const refreshMoreHotSingerList = () => async (dispatch: any, getState: any) => {
  const oldSingersList = getState().singers.singerList;
  const pageCount = getState().singers.pageCount;
  try {
    const res = await getHotSingerListRequest(pageCount);
    const isArrEqual = (arr1: any, arr2: any) => {
      return arr1.join("") === arr2.join("");
    };
    let oldArtists: any = [];
    if (isArrEqual(oldArtists, res.artists)) {
      dispatch(changeEnterLoading(false));
      dispatch(changePullUpLoading(false));
      dispatch(changePullDownLoading(false));
      return 1;
    } else {
      oldArtists = res.artists;
      const data = [...oldSingersList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullUpLoading(false));
      dispatch(changePullDownLoading(false));
    }
  } catch {
    return 2;
  }
};

export const {
  changePageCount,
  changePullUpLoading,
  changeEnterLoading,
  changeSingerList,
  changePullDownLoading
} = singersSlice.actions;

export default singersSlice.reducer;
