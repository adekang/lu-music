import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo
} from "react";
import BScroll from "better-scroll";
import { debounce } from "@/utils";
import styles from "./index.module.scss";

interface Props {
  direction?: "vertical" | "horizontal"; // 滚动的方向
  click?: true; // 是否支持点击
  refresh?: boolean; // 是否刷新
  onScroll?: (v: any) => void; // 滑动触发的回调函数
  pullUp?: () => void; // 上拉加载逻辑
  pullDown?: () => void; // 下拉加载逻辑
  pullUpLoading?: boolean; // 是否显示上拉 loading 动画
  pullDownLoading?: boolean; // 是否显示下拉 loading 动画
  bounceTop?: boolean; // 是否支持向上吸顶
  bounceBottom?: boolean; // 是否支持向下吸底
  children?: any;
}

const Scroll = forwardRef<any, Props>((props, ref) => {
  const [bScroll, setBScroll] = useState<any>();
  const scrollContainerRef = useRef<any>();

  const {
    direction = "vertical",
    click = true,
    refresh = true,
    onScroll = null,
    pullUpLoading = false,
    pullDownLoading = false,
    pullUp = null,
    pullDown = null,
    bounceTop = true,
    bounceBottom = true
  } = props;

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 1000);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 3000);
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      },
      //  过度动画
      useTransition: true
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll: any) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  // 判断用户的上拉动作
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on("scrollEnd", handlePullUp);
    // 解绑
    return () => {
      bScroll.off("scrollEnd", handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  // 判断用户的下拉动作
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos: any) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, pullUpDebounce, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <div className={styles.ScrollContainer} ref={scrollContainerRef}>
      <div>{props.children}</div>
    </div>
  );
});

Scroll.displayName = "Scroll";

export default Scroll;
