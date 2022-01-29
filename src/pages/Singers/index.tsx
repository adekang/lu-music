import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import Scroll from "@/components/Scroll";
import { getHotSingerListRequest } from "@/services/comment";
import styles from "./singers.module.scss";

const Singers: FC = function () {
  const [dataA, setDataA] = useState<any[]>();

  useEffect(() => {
    getHotSingerListRequest(1).then((data: any) => {
      setDataA(data.artists);
    });
  }, []);

  const handlePullUp = () => {
    console.log("handlePullUp::");
  };

  const handlePullDown = () => {
    console.log("handlePullDown::");
  };

  return (
    <>
      <div className={styles.Container}>
        <Scroll bounceTop={true} pullUp={handlePullUp} pullDown={handlePullDown}>
          <div>
            {dataA?.map(value => {
              return (
                <h1 className={styles.H1} key={value.id}>
                  {value.name}
                </h1>
              );
            })}
          </div>
        </Scroll>
      </div>
    </>
  );
};
export default Singers;
