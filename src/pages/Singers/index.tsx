import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import Scroll from "@/components/Scroll";
import { getHotSingerListRequest } from "@/services/comment";
import styles from "./singers.module.scss";
import { alphaTypes, categoryMap, categoryTypes } from "@/utils";
import Horizon from "@/components/Horizon";
import { Image } from "antd-mobile";

const Singers: FC = function () {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const [demo, setDemo] = useState<any>();

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  };

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  };
  const handlePullUp = () => {
    console.log("handlePullUp::");
  };

  const handlePullDown = () => {
    console.log("handlePullDown::");
  };

  useEffect(() => {
    (async function () {
      const res = await getHotSingerListRequest(10);
      res.code === 200 && setDemo(res.artists);
    })();
  }, []);

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
            {demo &&
              demo.map((item: any, index: number) => {
                return (
                  <div key={item.accountId + "" + index} className={styles.ListItem}>
                    <div className={styles.ImgWrapper}>
                      <Image src={`${item.picUrl}?param=300x300`} width="100%" height="100%" lazy />
                    </div>
                    <span>{item.name}</span>
                  </div>
                );
              })}
          </div>
        </Scroll>
      </div>
    </div>
  );
};
export default Singers;
