import React from "react";
import "./index.scss";
import { PlayOutline } from "antd-mobile-icons";

// 处理歌手列表拼接歌手名字
export const getName = (list: { name: string }[]) => {
  let str = "";
  list.map((item: { name: string }, index: number) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

interface Props {
  songs: any;
  showCollect: boolean;
}

// eslint-disable-next-line react/display-name
const SongsList = React.forwardRef((props: Props, refs: any) => {
  const { songs, showCollect } = props;

  const collectCount = 999;
  const totalCount = songs.length;

  const songList = (list: any) => {
    const res = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      res.push(
        <li key={item.id}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    }
    return res;
  };

  const collect = (count: any) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
    );
  };
  return (
    <div className="SongList" ref={refs}>
      <div className="first_line">
        <div className="play_all">
          <span className="iconfont">
            <PlayOutline />
          </span>
          <span>
            播放全部 <span className="sum">(共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <div className="SongItem">{songList(songs)}</div>
    </div>
  );
});

// 将ui组件包装成容器组件
export default React.memo(SongsList);
