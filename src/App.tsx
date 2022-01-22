import React, { FC, useEffect } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import styles from "./app.module.scss";
import { environmentVariable } from "./utils";
import Index from "@/pages/index";
import NotFound from "@/pages/NotFound";
import Singers from "@/pages/Singers";
import Rank from "@/pages/Rank";
import Recommend from "@/pages/Recommend";

const App: FC = function () {
  useEffect(() => {
    console.log(`environmentVariable()`, environmentVariable());
  }, []);

  const routes = [
    { path: "/singers", element: <Singers /> },
    { path: "/rank", element: <Rank /> },
    { path: "/recommend", element: <Recommend /> }
  ];

  return (
    <div className={styles.AppWrapper}>
      <Routes>
        <Route path="/" element={<Index />}>
          {routes.map((value, index) => (
            <Route key={index} path={value.path} element={value.element} />
          ))}
          <Route path="/" element={<Navigate to="/recommend" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
