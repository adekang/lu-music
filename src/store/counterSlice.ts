import { getBannerRequest } from "@/services/comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  age: number;
  name: string[];
  loading: boolean;
}

const initialState: CounterState = {
  value: 0,
  age: 18,
  name: [],
  loading: true
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    updateAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    updateName: (state, action: PayloadAction<never[]>) => {
      state.name = action.payload;
    }
  }
});

export const fetchName = () => async (dispatch: any) => {
  const { banners } = await getBannerRequest();
  dispatch(updateName(banners));
  dispatch(updateLoading(false));

  return banners;
};

// Action creators are generated for each case reducer function
export const { increment, decrement, updateLoading, incrementByAmount, updateAge, updateName } =
  counterSlice.actions;

export default counterSlice.reducer;
