import React, { Fragment } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { BASE_PNG } from '../const/urls';
import { CityForecast } from '../models/models';
import { getDateOnly } from '../utils/utils';
import FORMAT from '../const/formatDate';

interface Props {
  forecast: Array<CityForecast | null>;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: 100,
      width: '80%',
      margin: 'auto'
    },
    card: {
      bottom: '0px',
      backgroundColor: 'rgb(250, 250, 250) !important',
      maxWidth: '200px !important',
      maxHeight: '500px !important',
      margin: '2% 2% !important'
    }
  })
);

const Forecast = ({ forecast }: Props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      className={classes.container}
    >
      {forecast.map(
        (f, index) =>
          f != null && (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              <Grid item component={Card} sm={3} className={classes.card}>
                <CardContent id="test">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    {getDateOnly(new Date(f.applicableDate), FORMAT.LAS)}
                  </Typography>
                  <CardMedia
                    component="img"
                    alt="Sun"
                    image={`${BASE_PNG}${f.weatherStateIcon}.png`}
                  />
                  <Typography variant="subtitle1" align="center">
                    {f.weatherStatName}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle2" align="center">
                    {`Max temp: ${Math.round(f.maxTemp)}°C`}
                  </Typography>
                  <Typography variant="subtitle2" align="center">
                    {`Min temp: ${Math.round(f.minTemp)}°C`}
                  </Typography>
                </CardContent>
              </Grid>
            </Fragment>
          )
      )}
    </Grid>
  );
};

export default Forecast;
