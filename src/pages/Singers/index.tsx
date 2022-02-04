import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import Scroll from "@/components/Scroll";
import styles from "./singers.module.scss";
import { alphaTypes, categoryMap, categoryTypes } from "@/utils";
import Horizon from "@/components/Horizon";
import Loading from "@/components/Loading";
import { Image } from "antd-mobile";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import {
  changeEnterLoading,
  changePageCount,
  getHotSingerList,
  getSingerList,
  refreshMoreSingerList
} from "@/store/singersSlice";

const Singers: FC = function () {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");

  const singerList = useSelector((state: RootState) => state.singers.singerList);
  const enterLoading = useSelector((state: RootState) => state.singers.enterLoading);
  const pageCount = useSelector((state: RootState) => state.singers.pageCount);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (category || alpha) {
      console.log("运行了");
      dispatch(getSingerList(category, alpha)).then((res: any) => {
        console.log("res::", res);
      });
      dispatch(changeEnterLoading(true));
    }
  }, [alpha, category]);

  useEffect(() => {
    dispatch(getHotSingerList());
    dispatch(changeEnterLoading(true));
    dispatch(changePageCount(0));
  }, []);

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  };

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  };

  const handlePullUp = () => {
    dispatch(changePageCount(0));
  };

  const handlePullDown = () => {
    if (category || alpha) {
      dispatch(refreshMoreSingerList(category, alpha));
      dispatch(changePageCount(pageCount + 30));
    }
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
      {enterLoading ? <Loading /> : null}
      <div className={styles.Container}>
        <Scroll bounceTop={true} pullUp={handlePullUp} pullDown={handlePullDown}>
          <div className={styles.ListWrapper}>
            {singerList.length
              ? singerList.map((item: any, index: number) => {
                  return (
                    <div key={item.accountId + "" + index} className={styles.ListItem}>
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
    </div>
  );
};
export default Singers;
