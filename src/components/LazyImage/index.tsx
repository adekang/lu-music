import React, { memo } from "react";
import LazyLoad from "react-lazyload";
import musicLoad from "@/assets/music.png";
import styles from "./index.module.scss";

interface Props {
  loadImg: string;
  imgSrc: string;
}

const LazyImage: React.FC<Props> = props => {
  const { loadImg = musicLoad, imgSrc } = props;
  return (
    <>
      <LazyLoad placeholder={<img width="100%" height="100%" src={loadImg} alt={"musicLoad"} />}>
        <img src={imgSrc} width="100%" height="100%" alt="music" />
      </LazyLoad>
    </>
  );
};

export default memo(LazyImage);
