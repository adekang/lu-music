import React, { FC } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import "@/assets/scss/index.scss";

const Index: FC = function () {
  return (
    <div className={"indexWrapper"}>
      <nav className={"header"}>
        <h1>
          <UnorderedListOutline />
        </h1>
        <h1>lu music</h1>
        <h1>
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
    </div>
  );
};

export default Index;
