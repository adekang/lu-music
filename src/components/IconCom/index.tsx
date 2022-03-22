import React, { FC, memo } from "react";
import styles from "./index.module.scss";

interface Props {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const FontIcon: FC<Props> = props => {
  const { icon, style, className = "", onClick } = props;
  return (
    <>
      <span className={styles.iconFontWrapper} style={{ ...style }} onClick={onClick}>
        <i className={`iconfont ${className !== "" ? className : styles.icon} `}>{icon}</i>
      </span>
    </>
  );
};

export default memo(FontIcon);
