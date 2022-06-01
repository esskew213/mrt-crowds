import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { retrieveFromDatabase } from '../supabase_calls/retrieveFromDatabase';

const Switch = ({
  selectedLine,
  setSelectedLine,
  allLines = [],
  setAllLines,
  setCrowdData,
  isLoading,
  setIsLoading,
}) => {
  const handleChange = async (event) => {
    setSelectedLine(event.target.value);
    try {
      await retrieveFromDatabase(event.target.value).then((data) => {
        console.log(data);
        setCrowdData(data);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormControl fullWidth variant='standard' sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id='mrt-line-label'>MRT Line</InputLabel>
      <Select
        labelId='mrt-line-select-label'
        id='mrt-line-select'
        value={selectedLine}
        onChange={handleChange}
        label='MRT Line'
        disabled={isLoading}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {allLines &&
          allLines.map((line, idx) => {
            return (
              <MenuItem key={idx} value={line}>
                {line}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default Switch;
