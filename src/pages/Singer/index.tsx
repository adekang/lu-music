import React, { FC, useEffect, useState } from "react";
import Scroll from "@/components/Scroll";
import { CSSTransition } from "react-transition-group";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getSingerInfoRequest } from "@/services/comment";

const Singer: FC = function () {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getSingerInfoRequest(params.id);
      console.log(data);
    })();
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={250}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <div className="Container">
        <button onClick={() => setShowStatus(false)}>go</button>
        <div className="Header">头部</div>
        <div className="ImgWrapper">img</div>
        <div className="CollectButton">收藏</div>
        <div className="SongListWrapper">歌手表单</div>
      </div>
    </CSSTransition>
  );
};
export default Singer;
