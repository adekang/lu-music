import React from "react";
import Layout from "@/pages/index";
import NotFound from "@/pages/NotFound";
import Singers from "@/pages/Singers";
import Rank from "@/pages/Rank";
import Recommend from "@/pages/Recommend";
import Album from "@/pages/Album";
import Singer from "@/pages/Singer";
import { Navigate, RouteObject } from "react-router-dom";

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
        element: <Rank />
      },
      {
        path: "singers",
        element: <Singers />
      },
      {
        path: "recommend",
        element: <Recommend />
      },
      {
        path: "recommend/:id",
        element: <Album />
      },
      {
        path: "singers/:id",
        element: <Singer />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
];

export default routes;