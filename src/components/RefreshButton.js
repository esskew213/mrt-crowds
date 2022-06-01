import React from 'react';
import Button from '@mui/material/Button';
import { getCrowdData } from '../supabase_calls/getCrowdData';
const RefreshButton = ({ isLoading, setIsLoading, allLines }) => {
  const handleClick = async () => {
    setIsLoading(true);
    for (let line of allLines) {
      await getCrowdData(line)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    setIsLoading(false);
  };
  return (
    <>
      <Button variant='text' onClick={handleClick} disabled={isLoading}>
        Refresh
      </Button>
    </>
  );
};

export default RefreshButton;
