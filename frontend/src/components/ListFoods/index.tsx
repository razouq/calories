import { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { listFoods } from '../../store/reducers/foodsReducer';
import {
  StyledContainer,
  DeleteButton,
  UpdateButton,
  ShowButton,
  StyledLink,
} from './style';
// import DeleteFoodPopUp from '../DeleteFoodPopUp';
// import UpdateFoodPopUp from '../UpdateFoodPopUp';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import DeleteFoodPopUp from '../DeleteFoodPopUp';


function createData(
  _id: string,
  name: string,
  calories: number,
  date: Date,
) {
  return { _id, name, calories, date };
}

const ListFoods: FC = () => {
  const foods: Food[] = useSelector((state: RootState) =>
    Object.values(state.foods.foods)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listFoods());
  }, [dispatch]);
  const rows = foods.map(
    ({ _id, name, calories, date }) =>
      createData(_id, name, calories, date)
  );

  const [foodId, setFoodId] = useState<string>('');
  const [showDeleteStudentPopup, setShowDeleteStudentPopup] = useState(false);
  const [showUpdateStudentPopup, setShowUpdateStudentPopup] = useState(false);

  const onClickDelete = (id: string) => {
    setFoodId(id);
    setShowDeleteStudentPopup(true);
  };

  const onClickUpdate = (id: string) => {
    ('update');
    setFoodId(id);
    setShowUpdateStudentPopup(true);
  };

  return (
    <>
      <StyledContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Calories</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{formatDistance(new Date(row.date), new Date(), { addSuffix: true })}</TableCell>
                  <TableCell align="center">
                    <ShowButton variant="outlined">
                      <StyledLink to={`/foods/${row._id}`}>Show</StyledLink>
                    </ShowButton>
                    <UpdateButton
                      variant="outlined"
                      onClick={() => onClickUpdate(row._id)}
                    >
                      Update
                    </UpdateButton>
                    <DeleteButton
                      variant="outlined"
                      onClick={() => onClickDelete(row._id)}
                    >
                      Delete
                    </DeleteButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContainer>
      {showDeleteStudentPopup && (
        <DeleteFoodPopUp
          foodId={foodId}
          open={showDeleteStudentPopup}
          handleClose={() => setShowDeleteStudentPopup(false)}
        />
      )}
      {/* {showUpdateStudentPopup && (
        <UpdateStudentPopUp
          studentId={studentId}
          open={showUpdateStudentPopup}
          handleClose={() => setShowUpdateStudentPopup(false)}
        />
      )} */}
    </>
  );
};

export default ListFoods;