import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import Scroll from "@/components/Scroll";
import { getHotSingerListRequest } from "@/services/comment";
import styles from "./singers.module.scss";
import { alphaTypes, categoryMap, categoryTypes } from "@/utils";
import Horizon from "@/components/Horizon";

const Singers: FC = function () {
  useEffect(() => {}, []);

  const handlePullUp = () => {
    console.log("handlePullUp::");
  };

  const handlePullDown = () => {
    console.log("handlePullDown::");
  };

  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  };

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
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
          <div></div>
        </Scroll>
      </div>
    </div>
  );
};
export default Singers;
