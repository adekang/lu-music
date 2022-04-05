import React, { FC, useEffect } from "react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import Scroll from "@/components/Scroll";
import { getRankList } from "@/store/rankSlice";
import { useNavigate } from "react-router-dom";
import { filterIndex } from "@/utils";
import "./index.scss";
import Loading from "@/components/Loading";

const Rank: FC = function () {
  const { loading, rankList } = useSelector((state: RootState) => state.rank);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankList());
    }
  }, []);

  const enterDetail = (id: number) => {
    navigate(`./${id}`);
  };

  const renderSongList = (list: any[]) => {
    return list.length ? (
      <ul className="RankSongList">
        {list.map((item: any, index: any) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list: any, global?: any) => {
    return (
      <ul
        className="RankList"
        style={
          global
            ? {
                display: "flex"
              }
            : {
                display: ""
              }
        }
      >
        {list.map((item: any) => {
          return (
            <li
              style={
                item.tracks.length
                  ? {
                      display: "flex"
                    }
                  : {
                      display: ""
                    }
              }
              className="RankListItem"
              key={item.updateTime}
              onClick={() => enterDetail(item.id)}
            >
              <div
                className="img_wrapper"
                style={
                  item.tracks.length
                    ? {
                        width: "27vw",
                        height: "27vw"
                      }
                    : {
                        width: "32vw",
                        height: "32vw"
                      }
                }
              >
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate" />
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </li>
          );
        })}
      </ul>
    );
  };

  // 榜单数据未加载出来之前都给隐藏
  const displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <>
      <div className="RankContainer">
        <Scroll>
          <div>
            <h1 className="offical" style={displayStyle}>
              官方榜
            </h1>
            {renderRankList(officialList)}
            <h1 className="global" style={displayStyle}>
              全球榜
            </h1>
            {renderRankList(globalList, true)}
            {loading ? <Loading /> : null}
          </div>
        </Scroll>
      </div>
    </>
  );
};
export default Rank;

// useEffect(() => {
//   (async function () {
//     const res = await getData();
//     console.log(res);
//     res.code === 0 && setstate(res.data);
//   })();
// }, []);
