import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector(selectUser);
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <p># {topic}</p>
    </div>
  );
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="data:image/jpeg;base64,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" />
        <Avatar src={user.photoUrl}>{user.email[0]}</Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar_statNumber">2000</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar_statNumber">2000</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("politics")}
      </div>
    </div>
  );
}

export default Sidebar;
