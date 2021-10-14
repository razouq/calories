import { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { format, formatDistance } from 'date-fns';
import { Grid } from '@mui/material';

const Report: FC = () => {
  const [days, setDays] = useState<{
    [_id: string]: any;
  }>({});
  useEffect(() => {
    const getReport = async () => {
      const response: AxiosResponse = await axios.get(
        'http://localhost:5000/api/foods/report',
        { withCredentials: true }
      );
      setDays(response.data as {});
      console.log(response.data);
    };
    getReport();
  }, []);

  const renderDays = (min: number, max: number) => {
    return Object.keys(days).map((key, index) => {
      if (min <= index && index <= max)
        return (
          <p>
            <b>{format(new Date(key), 'dd/MM/yyyy')}:</b>
            {days[key]}
          </p>
        );
    });
  };

  return (
    <>
      <h1>report</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h3>this week</h3>
          <div>{renderDays(0, 6)}</div>
        </Grid>
        <Grid item xs={6}>
          <h3>the week before</h3>
          <div>{renderDays(7, 13)}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
