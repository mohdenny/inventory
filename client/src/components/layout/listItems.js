import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HelpIcon from '@mui/icons-material/Help';

const dataListMenu = [
  {
    link: "/dashboard",
    text: "Dashboard",
    icon: <DashboardIcon/>
  },
  {
    link: "/items",
    text: "Items",
    icon: <Inventory2Icon/>
  },
  {
    link: "/help",
    text: "Help",
    icon: <HelpIcon/>
  },
]

export const mainListItems = (setSelectedItem) => (
  <>
    {
      dataListMenu.map((dataList, index) => (
        <Link key={index} to={dataList.link} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton onClick={() => setSelectedItem(dataList.text)}>
            <ListItemIcon>
              {dataList.icon}
            </ListItemIcon>
            <ListItemText primary={dataList.text} />
          </ListItemButton>
        </Link>
      ))
    }
  </>
);