import { FC } from 'react';
import UsersReport from './UsersReport';
import WeekReport from './WeekReport';

const Report: FC = () => {
  

  return (
    <>
      <h1>report</h1>
      <WeekReport />
      <UsersReport />
    </>
  );
};

export default Report;
