import { Outlet } from "react-router-dom";
import DashBoardNavigation from "../components/DashboardNavigation";

const DashboardRoot = () => {
  return (
    <div>
      <DashBoardNavigation />
      <Outlet />
    </div>
  );
};

export default DashboardRoot;
