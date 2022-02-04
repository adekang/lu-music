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
      state.pullUpLoading = action.payload;
    }
  }
});

export const getSingerList = (category: string, alpha: string) => async (dispatch: any) => {
  try {
    const res = await getSingerListRequest(category, alpha, 0);
    dispatch(changeSingerList(res.artists));
    dispatch(changeEnterLoading(false));
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
    console.log(pageCount);
    try {
      const res = await getSingerListRequest(category, alpha, pageCount);
      console.log("获取的", res.artists);
      const data = [...oldSingersList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullDownLoading(false));
      return "刷新成功";
    } catch {
      return "刷新失败";
    }
  };

export const getHotSingerList = () => async (dispatch: any) => {
  try {
    const res = await getHotSingerListRequest(0);
    dispatch(changeSingerList(res.artists));
    dispatch(changeEnterLoading(false));
    dispatch(changePullDownLoading(false));
    return "歌手数据成功";
  } catch {
    return "热门歌手数据获取失败";
  }
};

//加载更多热门歌手
export const refreshMoreHotSingerList = () => {};

export const { changePageCount, changeEnterLoading, changeSingerList, changePullDownLoading } =
  singersSlice.actions;

export default singersSlice.reducer;
