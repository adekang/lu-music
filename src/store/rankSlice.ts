import { getBannerRequest, getRankListRequest } from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  rankList: any[];
  loading: boolean;
}

const initialState: CounterState = {
  rankList: [],
  loading: true
};

export const rankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    changeRankList: (state, action: PayloadAction<any[]>) => {
      state.rankList = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const getRankList = () => async (dispatch: any) => {
  // const { banners } = await getRankListRequest();

  getRankListRequest()
    .then((data: { list: any }) => {
      const list = data && data.list;
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    })
    .catch((err: any) => {
      return err;
    });
};

// Action creators are generated for each case reducer function
export const { changeLoading, changeRankList } = rankSlice.actions;

export default rankSlice.reducer;
