import React, { FC, useEffect, lazy } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import styles from "./app.module.scss";
import Layout from "@/pages/index";
import NotFound from "@/pages/NotFound";
import Singers from "@/pages/Singers";
import Rank from "@/pages/Rank";
import Recommend from "@/pages/Recommend";
import Album from "@/pages/Album";
import Singer from "@/pages/Singer";

const App: FC = function () {
  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/recommend" />
        },
        {
          path: "rank",
          element: <Rank />
        },
        {
          path: "singers",
          element: <Singers />
        },
        {
          path: "recommend",
          element: <Recommend />
        }
      ]
    },
    {
      path: "recommend/:id",
      element: <Album />
    },
    {
      path: "singers/:id",
      element: <Singer />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <div className={styles.AppWrapper}>
      {/*<Routes>*/}
      {/*  <Route path="/" element={<Index />}>*/}
      {/*    <Route path="rank" element={<Rank />} />*/}
      {/*    <Route path="singers" element={<Singers />} />*/}
      {/*    <Route path="recommend" element={<Recommend />}>*/}
      {/*      <Route path=":id" element={<Album />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="/" element={<Navigate to="/recommend" />} />*/}
      {/*    <Route path="*" element={<NotFound />} />*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
      {element}
    </div>
  );
};

export default App;
