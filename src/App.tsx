import React, { FC } from "react";
import { useRoutes } from "react-router-dom";
import styles from "./app.module.scss";
// import Layout from "@/pages/index";
// import NotFound from "@/pages/NotFound";
// import Singers from "@/pages/Singers";
// import Rank from "@/pages/Rank";
// import Recommend from "@/pages/Recommend";
// import Album from "@/pages/Album";
// import Singer from "@/pages/Singer";
// import Index from "@/pages/index";

import Player from "@/components/Player";
import routes from "@/router/route";

const App: FC = function () {
  const element = useRoutes(routes);

  return (
    <div className={styles.AppWrapper}>
      {/*<Routes>*/}
      {/*  <Route path="/" element={<Index />}>*/}
      {/*    <Route path="rank" element={<Rank />} />*/}
      {/*    <Route path="singers" element={<Singers />}>*/}
      {/*      <Route path=":id" element={<Singer />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="recommend" element={<Recommend />}>*/}
      {/*      <Route path=":id" element={<Album />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="/" element={<Navigate to="/recommend" />} />*/}
      {/*    <Route path="*" element={<NotFound />} />*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
      {element}
      <Player />
    </div>
  );
};

export default App;
