import React, { ChangeEvent, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { generateNextDays, filterListForAttribute, mode } from '../utils/utils';
import FORMAT_DATE from '../const/formatDate';
import { BASE_URL } from '../const/urls';
// eslint-disable-next-line import/extensions
import Forecast from './Forecast';
import { City, CityForecast } from '../models/models';

const Form = () => {
  const [city, setCity] = useState<string>('');
  const [citySelect, setCitySelect] = useState<City | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const [cities, setCities] = useState<Array<City>>([]);
  const [forecast, setForecast] = useState<Array<CityForecast | null> | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const loading = open && cities.length === 0;

  const onChangeCity = (event: ChangeEvent<HTMLInputElement>): void =>
    setCity(event.target.value);

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
    setForecast(null);
    setLoadingData(true);
  };
  const onSelectCity = (event: ChangeEvent<any>) => {
    if (event.target.textContent && event.target.textContent.length > 0) {
      const currentCity = cities.find(
        (c) => c.title === event.target.textContent
      );
      setCitySelect(currentCity || null);
      setLoadingData(true);
    }
    setForecast(null);
  };

  useEffect((): void => {
    if (city.length > 0) {
      const fetchMyAPI = async () => {
        const data = await fetch(
          `${BASE_URL}/api/weather/getLocation/${city}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        ).then((resp) => resp.json());
        if (data.length > 0) {
          setCities(data);
        }
      };
      fetchMyAPI();
    } else {
      setCities([]);
      setOpen(false);
    }
  }, [city]);

  useEffect(() => {
    if (citySelect !== null) {
      const listDate = generateNextDays(
        selectedDate !== null ? selectedDate : new Date(),
        FORMAT_DATE.WT
      );
      Promise.all(
        listDate.map((date) =>
          fetch(
            `${BASE_URL}/api/weather/getLocationDay/${citySelect?.woeid}/${date}/`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            }
          )
            .then((resp) => resp.json())
            .then((data): CityForecast | null => {
              return data.length > 0
                ? {
                    weatherStateIcon: mode(
                      filterListForAttribute(data, 'weather_state_abbr')
                    ),
                    weatherStatName: mode(
                      filterListForAttribute(data, 'weather_state_name')
                    ),
                    applicableDate: mode(
                      filterListForAttribute(data, 'applicable_date')
                    ),
                    maxTemp: Math.round(
                      Math.max(...filterListForAttribute(data, 'max_temp'))
                    ),
                    minTemp: Math.round(
                      Math.min(...filterListForAttribute(data, 'max_temp'))
                    )
                  }
                : null;
            })
        )
      )
        .then((resp) => setForecast(resp.find((r) => r !== null) ? resp : null))
        .finally(() => setLoadingData(false));
    } else {
      setLoadingData(false);
    }
  }, [selectedDate, citySelect]);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6} md={3}>
          <Autocomplete
            id="select-city"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(option, value) => option.title === value.title}
            getOptionLabel={(c) => c.title}
            options={cities}
            loading={loading}
            onChange={onSelectCity}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select City"
                variant="standard"
                value={city}
                onChange={onChangeCity}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-city"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {!loadingData &&
          citySelect !== null &&
          (forecast !== null ? (
            <Forecast forecast={forecast} />
          ) : (
            <Grid item>
              <span>No Content.</span>
            </Grid>
          ))}
        {loadingData && <CircularProgress />}
      </Grid>
    </>
  );
};

export default Form;
