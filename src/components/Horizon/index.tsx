import React, { useEffect, useRef } from "react";
import Scroll from "@/components/Scroll";
import "./index.scss";

interface Props {
  list: { name: string; key: string }[];
  oldVal: string;
  title: string;
  handleClick: (key: string) => void;
}

const Horizon: React.FC<Props> = props => {
  const { list = [], oldVal = "", title = "", handleClick = null } = props;

  const listRef = useRef<any>();

  useEffect(() => {
    const categoryDOM = listRef.current;
    const tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);
  return (
    <Scroll direction={"horizontal"}>
      <div className="ListItem" ref={listRef}>
        <span>{title}</span>
        {list.map(item => {
          return (
            <span
              onClick={() => {
                handleClick && handleClick(item.key);
              }}
              className={`${oldVal === item.key ? "selected" : ""}`}
              key={item.key}
            >
              {item.name}
            </span>
          );
        })}
      </div>
    </Scroll>
  );
};
export default Horizon;
