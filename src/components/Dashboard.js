import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Flats from './Flats';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (

    <Paper className={classes.paper}>
      <Flats />
    </Paper>

  );
}
