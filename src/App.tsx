import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

  return (
    <div className={styles.AppWrapper}>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/rank" element={<Rank />} />
          <Route path="/singers" element={<Singers />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/" element={<Recommend />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
