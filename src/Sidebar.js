import React from 'react';
import "./Sidebar.css";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import Sidebarchat from './SidebarChat';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://avatars1.githubusercontent.com/u/44756140?s=400&u=5378afea8dc7a60522a0970d84753d0f2b9a4148&v=4" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat"/>
        </div>
      </div>

      <div className="sidebar__chats">
        <Sidebarchat />
      </div>
    </div>
  )
}

export default Sidebar;
