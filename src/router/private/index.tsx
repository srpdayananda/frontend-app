import React from "react";

import PrivateLayout from "../../layout/private";
import Loadable from "../../shared/components/loadable";
// import RequireAuth from '../../shared/components/require-auth';

const User = Loadable(React.lazy(() => import("../../module/user")));
const Unauthorized = Loadable(
  React.lazy(() => import("../../shared/pages/unauthorized"))
);

const PrivateRoutes = {
  path: "/",
  element: <PrivateLayout />,
  children: [
    {
      path: "user/*",
      element: <User />,
    },
    {
      path: "unauthorized",
      element: <Unauthorized />,
    },
  ],
};

export default PrivateRoutes;
