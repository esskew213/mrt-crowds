import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getMRTLines } from '../supabase_calls/getMRTLines';

const Switch = () => {
  const [allLines, setAllLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState('');
  useEffect(() => {
    getMRTLines().then((data) => {
      const lines = data.map((l) => l['mrt_line']);
      setAllLines(lines);
    });
  }, []);

  const handleChange = (event) => {
    setSelectedLine(event.target.value);
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
