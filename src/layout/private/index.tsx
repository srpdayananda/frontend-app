import { Outlet } from "react-router-dom";

import TopBar from "./top-bar";
import "./index.scss";

const PrivateLayout = () => {
  return (
    <div className="full-layout">
      <TopBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
