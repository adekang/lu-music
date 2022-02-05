import React, { FC, useEffect, useState } from "react";
import Scroll from "@/components/Scroll";
import styles from "./singers.module.scss";
import { alphaTypes, categoryTypes } from "@/utils";
import Horizon from "@/components/Horizon";
import Loading from "@/components/Loading";
import { Image } from "antd-mobile";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList
} from "@/store/singersSlice";
import { useNavigate } from "react-router-dom";

const Singers: FC = function () {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");

  const singerList = useSelector((state: RootState) => state.singers.singerList);
  const enterLoading = useSelector((state: RootState) => state.singers.enterLoading);
  const pullDownLoading = useSelector((state: RootState) => state.singers.pullDownLoading);
  const pullUpLoading = useSelector((state: RootState) => state.singers.pullUpLoading);
  const pageCount = useSelector((state: RootState) => state.singers.pageCount);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, alpha));
  }, [alpha, category]);

  useEffect(() => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getHotSingerList());
  }, []);

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  };

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  };

  const changeHotMode = (category: string, alpha: string, hot: boolean) => {
    if (hot) {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  };

  const handlePullUp = () => {
    dispatch(changePageCount(pageCount + 30));
    dispatch(changePullDownLoading(true));
    if (category === "" && alpha === "") {
      changeHotMode(category, alpha, true);
    } else {
      changeHotMode(category, alpha, false);
    }
  };

  const handlePullDown = () => {
    dispatch(changePageCount(0));
    dispatch(changePullUpLoading(true));
    if (category === "" && alpha === "") {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  };

  const goToId = (id: number) => {
    navigate(`./${id}`);
  };

  return (
    <div>
      <div className={styles.NavContainer}>
        <Horizon
          list={categoryTypes}
          title={"分类(默认热门):"}
          oldVal={category}
          handleClick={handleUpdateCategory}
        />
        <Horizon
          list={alphaTypes}
          oldVal={alpha}
          title={"首字母:"}
          handleClick={handleUpdateAlpha}
        />
      </div>
      <div className={styles.Container}>
        <Scroll bounceTop={true} pullUp={handlePullUp} pullDown={handlePullDown}>
          <div className={styles.ListWrapper}>
            {singerList.length
              ? singerList.map((item: any, index: number) => {
                  return (
                    <div
                      key={item.accountId + "" + index}
                      onClick={() => goToId(item.id)}
                      className={styles.ListItem}
                    >
                      <div className={styles.ImgWrapper}>
                        <Image
                          src={`${item.picUrl}?param=300x300`}
                          width="100%"
                          height="100%"
                          lazy
                        />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  );
                })
              : null}
          </div>
        </Scroll>
      </div>
      {enterLoading || pullDownLoading || pullUpLoading ? <Loading /> : null}
    </div>
  );
};
export default Singers;
