import React, { FC, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import "@/assets/scss/index.scss";
import Sidebar from "@/pages/Sidebar";

const Index: FC = function () {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  return (
    <div className={"indexWrapper"}>
      <nav className={"header"}>
        <h1
          onClick={() => {
            setShow(true);
          }}
        >
          <UnorderedListOutline />
        </h1>
        <h1
          onClick={() => {
            navigate("user");
          }}
        >
          lu music
        </h1>
        <h1
          onClick={() => {
            navigate("search");
          }}
        >
          <SearchOutline />
        </h1>
      </nav>
      <nav className={"navWrapper"}>
        <ul>
          <li>
            <NavLink to="recommend">主页</NavLink>
          </li>
          <li>
            <NavLink to="rank">排行</NavLink>
          </li>
          <li>
            <NavLink to="singers">歌手</NavLink>
          </li>
        </ul>
      </nav>
      <div className={"outlet"}>
        <Outlet />
      </div>

      <Sidebar show={show} onClose={onClose} />
    </div>
  );
};

export default Index;
