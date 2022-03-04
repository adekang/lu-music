import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import { debounce } from "@/utils";

interface Props {
  back: () => void;
  newQuery: string;
  handleQuery: (v: any) => void;
}

// eslint-disable-next-line react/display-name
const SearchBox: React.FC<Props> = props => {
  const queryRef = useRef<any>();
  const [query, setQuery] = useState("");
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };
  useEffect(() => {
    queryRef.current.focus();
  }, []);
  const handleChange = (e: any) => {
    // 搜索框内容改变时的逻辑
    setQuery(e.currentTarget.value);
  };
  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);
  useEffect(() => {
    // 注意防抖
    handleQueryDebounce(query);
  }, [query]);

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);
  const clearQuery = () => {
    // 清空框内容的逻辑
    setQuery("");
    queryRef.current.focus();
  };

  return (
    <div className="SearchBoxWrapper">
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>
        &#xe600;
      </i>
    </div>
  );
};

// 将ui组件包装成容器组件
export default React.memo(SearchBox);
