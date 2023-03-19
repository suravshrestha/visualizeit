import "./PathFinderPage.css";
import PathFinder from "../../Components/PathFinder/PathFinderComponent/PathFinder";
import SideBar from "../../Components/SideBar/SideBar";

import React, { useEffect } from "react";

const PathFinderPage = () => {
  useEffect(() => {
    document.title = "Path Finder";
  }, []);

  return (
    <div className="pathFinderPage">
      <div className="pathFinderPage_left">
        <SideBar active="pathFinder" />
      </div>

      <div className="pathFinderPage_right">
        <PathFinder />
      </div>
    </div>
  );
};

export default PathFinderPage;
