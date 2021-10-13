import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../../store';
import { formatDistance } from 'date-fns';

interface ShowStudentParams {
  id: string;
}

const ShowFood: FC = () => {
  const { id } = useParams<ShowStudentParams>();
  const food: Food = useSelector((state: RootState) => state.foods.foods[id]);
  return (
    <>
      <p>
        <b>Name</b>: {food.name}
      </p>
      <p>
        <b>Calories</b>: {food.calories}
      </p>
      <p>
        <b>Date</b>:
        {formatDistance(new Date(food.date), new Date(), { addSuffix: true })}
      </p>
    </>
  );
};

export default ShowFood;
