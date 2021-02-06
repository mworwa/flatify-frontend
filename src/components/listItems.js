import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <Link to="/add_flat" style={{ textDecoration: 'none' }}>
        <ListItemText primary="Add flat" />
      </Link>
    </ListItem>
  </div>
);