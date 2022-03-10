import React from "react";
import Layout from "@/pages/index";
import NotFound from "@/pages/NotFound";
// import Singers from "@/pages/Singers";
// import Rank from "@/pages/Rank";
// import Recommend from "@/pages/Recommend";
// import Album from "@/pages/Album";
// import Singer from "@/pages/Singer";
// import Search from "@/pages/Search";

import { Navigate, RouteObject } from "react-router-dom";

const Recommend = React.lazy(() => import("../pages/Recommend"));
const Singers = React.lazy(() => import("../pages/Singers"));
const Rank = React.lazy(() => import("../pages/Rank"));
const Search = React.lazy(() => import("../pages/Search"));
const Album = React.lazy(() => import("../pages/Album"));
const Singer = React.lazy(() => import("../pages/Singer"));



const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="recommend" />
      },
      {
        path: "rank",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Rank />
          </React.Suspense>
        )
      },
      {
        path: "singers",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Singers />
          </React.Suspense>
        )
      },
      {
        path: "recommend",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Recommend />
          </React.Suspense>
        )
      },
      {
        path: "search",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Search />
          </React.Suspense>
        )
      },
      {
        path: "recommend/:id",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Album />
          </React.Suspense>
        )
      },
      {
        path: "singers/:id",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Singer />
          </React.Suspense>
        )
      },
      {
        path: "album/:id",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Album />
          </React.Suspense>
        )
      },
      {
        path: "rank/:id",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Album />
          </React.Suspense>
        )
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
];

export default routes;
