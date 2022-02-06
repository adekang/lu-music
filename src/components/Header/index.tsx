import React from "react";
import "./index.scss";
import { LeftOutline } from "antd-mobile-icons";

interface Props {
  title: string;
  onClose: () => void;
  isMarquee?: boolean;
}

// eslint-disable-next-line react/display-name
const Header = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { title, onClose, isMarquee = false } = props;
  return (
    <div className="HeaderWrapper" ref={ref}>
      <div onClick={onClose}>
        <LeftOutline />
      </div>
      <h1 className="Marquee">{isMarquee ? <span>{title}</span> : title}</h1>
    </div>
  );
});
export default Header;
