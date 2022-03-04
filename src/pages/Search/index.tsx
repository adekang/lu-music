import React, { FC, useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import "./index.scss";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading";
import { getName } from "@/utils";
import LazyLoad, { forceCheck } from "react-lazyload";
import musicPng from "./music.png";
import singerPng from "./singer.png";
import { changeEnterLoading, getHotKeyWords, getSuggestList } from "@/store/searchSlice";
import SearchBox from "@/components/SearchBox";
import { getSongDetail } from "@/store/playerSlice";

const Search: FC = function () {
  const { hotList, suggestList, enterLoading, songsList } = useSelector((state: RootState) => {
    return state.search;
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  // 组件内部
  const [query, setQuery] = useState("");

  useEffect(() => {
    setShow(true);
    // 用了 redux 缓存，不再赘述
    if (!hotList.length) console.log("get");
    dispatch(getHotKeyWords());
  }, []);

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q: any) => {
    setQuery(q);
    if (!q) return;
    dispatch(changeEnterLoading(true));
    dispatch(getSuggestList(q));
  };

  const selectItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number) => {
    dispatch(getSongDetail(id));
  };

  const renderHotKey = () => {
    const list = hotList ? hotList : [];
    return (
      <ul>
        {list.map(item => {
          return (
            <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
              <span>{item.first}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  const renderSingers = () => {
    const singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <div className="SearchList">
        <h1 className="title">相关歌手</h1>
        {singers.map((item, index: number) => {
          return (
            <div
              className="SearchListItem"
              key={item.accountId + "" + index}
              onClick={() => navigate(`/singers/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={<img width="100%" height="100%" src={singerPng} alt="singer" />}
                >
                  <img src={item.picUrl} width="100%" height="100%" alt="music" />
                </LazyLoad>
              </div>
              <span className="name">歌手: {item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
  const renderAlbum = () => {
    const albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <div className="SearchList">
        <h1 className="title">相关歌单</h1>
        {albums.map((item, index: number) => {
          return (
            <div
              className="SearchListItem"
              key={item.accountId + "" + index}
              onClick={() => navigate(`/album/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={<img width="100%" height="100%" src={musicPng} alt="music" />}
                >
                  <img src={item.coverImgUrl} width="100%" height="100%" alt="music" />
                </LazyLoad>
              </div>
              <span className="name">歌单: {item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
  const renderSongs = () => {
    return (
      <div className="SearchSongItem" style={{ paddingLeft: "20px" }}>
        {songsList.map(
          (item: {
            id: number;
            name: string;
            artists: any;
            album: {
              name: string;
            };
          }) => {
            return (
              <li key={item.id} onClick={e => selectItem(e, Number(item.id))}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            );
          }
        )}
      </div>
    );
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <div className="Container">
        <div className="search_box_wrapper">
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery} />
        </div>
        <div className="ShortcutWrapper" style={{ display: `${!query ? "" : "none"}` }}>
          <Scroll>
            <div>
              <div className="HotKey">
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </div>
              {/* <SearchHistory>
                <h1 className="title">
                  <span className="text">搜索历史</span>
                  <span className="clear">
                    <i className="iconfont">&#xe63d;</i>
                  </span>
                </h1>
                {renderHistoryList()}
              </SearchHistory> */}
            </div>
          </Scroll>
        </div>
        {/* 下面为搜索结果 */}
        <div className="ShortcutWrapper" style={{ display: `${query ? "" : "none"}` }}>
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </div>
        {enterLoading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
};
export default Search;
