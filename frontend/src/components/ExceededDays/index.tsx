import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';

function createData(_id: string, sum: number) {
  return { _id, sum};
}

const ExceededDays: FC = () => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    const getExceededDays = async () => {
      const response: AxiosResponse = await axios.get(
        'http://localhost:5000/api/foods/exceeded-days',
        { withCredentials: true }
      );
      console.log(response.data);
      setDays(response.data as [])
    };
    getExceededDays();
  }, []);
  const rows = days.map(({ _id, sum}) =>
    createData(_id, sum),
  );
  return (
    <>
      <h3>Exceeded Days</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">day</TableCell>
              <TableCell align="center">Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{format(new Date(row._id), 'dd/MM/yyyy')}</TableCell>
                <TableCell align="center">{row.sum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExceededDays;
