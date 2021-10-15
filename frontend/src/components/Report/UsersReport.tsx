import { FC, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function createData(_id: string, name: string, averageCalories: number) {
  return { _id, name, averageCalories };
}

const UsersReport: FC = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAverageLastWeek = async () => {
      const response: AxiosResponse = await axios.get(
        'http://localhost:5000/api/foods/average-last-week',
        { withCredentials: true }
      );
      console.log(response.data);
      setUsers(response.data as []);
    };
    getAverageLastWeek();
  }, []);

  const rows = users.map(({ _id, name, averageCalories }) =>
    createData(_id, name, averageCalories)
  );
  return (
    <>
      <h3>users</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Average Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.averageCalories.toFixed(0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersReport;
