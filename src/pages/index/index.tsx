import React, { FC } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import "@/assets/scss/index.scss";

const Index: FC = function () {
  const navigate = useNavigate();
  return (
    <div className={"indexWrapper"}>
      <nav className={"header"}>
        <h1
          onClick={() => {
            navigate("login");
          }}
        >
          <UnorderedListOutline />
        </h1>
        <h1>lu music</h1>
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
    </div>
  );
};

export default Index;
