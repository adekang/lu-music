import React, { FC } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SearchOutline, UnorderedListOutline } from "antd-mobile-icons";
import "@/assets/scss/index.scss";
import { getCookie, getLocalStorage, getSession } from "@/services/utils";

const Index: FC = function () {
  const navigate = useNavigate();

  console.log("session--token::>>", getSession("token"));
  console.log("cookie--cookie::>>", getCookie("cookie"));
  console.log("cookie--token::>>", getCookie("token"));
  console.log("localStorage--account::>>", getLocalStorage("account"));
  console.log("localStorage--account::>>", getLocalStorage("profile"));

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
