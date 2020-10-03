import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
//import Form from '../../components/Form'
import TssDocument from '../../components/TssDocument'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const padding = {
  padding: '10px 10px 10px 10px',
}

const Downlaod = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={padding}>
              <Form />
            </div>
          </Paper>
        </Grid> */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={padding}>
              <TssDocument />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Downlaod;
