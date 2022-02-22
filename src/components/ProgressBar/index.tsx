import React, { useEffect, useRef, useState } from "react";
import { prefixStyle } from "@/utils";
import "./index.scss";

interface Props {
  percent: number;
  percentChange: (T: number) => void;
}

const ProgressBar: React.FC<Props> = props => {
  const { percent } = props;
  const { percentChange } = props;

  const transform = prefixStyle("transform");

  const progressBar = useRef<any>();
  const progress = useRef<any>();
  const progressBtn = useRef<any>();
  const [touch, setTouch] = useState<any>({});

  const progressBtnWidth = 8;

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  // 处理进度条的偏移
  const _offset = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };
  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth;
    percentChange(curPercent);
  };

  const progressTouchStart = (e: any) => {
    const startTouch = {
      startX: undefined,
      initiated: true,
      left: undefined
    };
    startTouch.initiated = true; //initial 为 true 表示滑动动作开始了
    startTouch.startX = e.touches[0].pageX; // 滑动开始时横向坐标
    startTouch.left = progress.current.clientWidth; // 当前 progress 长度
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTouch(startTouch);
  };
  const progressTouchMove = (e: any) => {
    if (!touch.initiated) return;
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
    _changePercent();
  };
  const progressTouchEnd = (e: any) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
  };

  const progressClick = (e: any) => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  return (
    <div className="ProgressBarWrapper">
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress} />
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
