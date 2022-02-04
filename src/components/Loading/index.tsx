import React, { useEffect, useRef } from "react";
import "./index.scss";
import { Space, SpinLoading } from "antd-mobile";

interface Props {}

const Loading: React.FC<Props> = props => {
  return (
    <div className="LoadingWrapper">
      <Space direction="horizontal" wrap block style={{ "--gap": "16px" }}>
        <SpinLoading color="primary" style={{ "--size": "48px" }} />
      </Space>
    </div>
  );
};
export default Loading;
