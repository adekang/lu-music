import React, { FC, useEffect } from "react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { decrement, increment, updateAge, fetchName } from "@/store/counterSlice";
import { getResultSongsListRequest } from "@/services/comment";

const Rank: FC = function () {
  const count = useSelector((state: RootState) => state.counter.value);
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useAppDispatch();

  const getSongs = () => {
    dispatch(fetchName()).then(res => {
      console.log(res);
    });
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          -
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          +
        </button>

        {counter.loading ? <h1>加载中</h1> : <h1>加载完成</h1>}
        <input
          type="number"
          onBlur={e => {
            const newAge = e.target.value;
            dispatch(updateAge(Number(newAge)));
          }}
        />
        <h1>{counter.age}</h1>
      </div>
    </div>
  );
};
export default Rank;
