import React, { useEffect, useState } from 'react';
import Switch from './components/Switch';
import { Typography } from '@mui/material';
import MapComponent from './mapComponents/MapComponent';
import { getMRTLines } from './supabase_calls/getMRTLines';
import { retrieveDateFromDatabase } from './supabase_calls/checkDataOutdated';
import { isDataOutdated } from './supabase_calls/checkDataOutdated';
import { getCrowdData } from './supabase_calls/getCrowdData';
function App() {
  const [allLines, setAllLines] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLine, setSelectedLine] = useState('');
  const [crowdData, setCrowdData] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    getMRTLines()
      .then((data) => {
        const lines = data.map((l) => l['mrt_line']);
        setAllLines(lines);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (allLines.length > 0) {
      isDataOutdated(60).then((dataIsOutdated) => {
        console.log('isDataOutdated', dataIsOutdated);
        if (dataIsOutdated) {
          for (let line of allLines) {
            getCrowdData(line).then((res) => console.log(res));
          }
        }
      });
      retrieveDateFromDatabase().then((dateStr) =>
        setLastUpdated(new Date(dateStr))
      );
    }
  }, [allLines, selectedLine]);

  return (
    <div className='App'>
      <Typography variant='h4'>How crowded is your MRT?</Typography>
      <Typography variant='body2' color='textSecondary'>
        Last updated at{' '}
        {lastUpdated &&
          lastUpdated?.toLocaleDateString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
          })}
      </Typography>

      <Typography variant='body1'>
        This app displays MRT platform crowd data pulled from LTA Data mall
        every hour. Select your line of interest to see how crowded the stations
        are!
      </Typography>
      <Switch
        allLines={allLines}
        setAllLines={setAllLines}
        selectedLine={selectedLine}
        setSelectedLine={setSelectedLine}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setCrowdData={setCrowdData}
      />
      {/* <RefreshButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        allLines={allLines}
      /> */}
      <MapComponent crowdData={crowdData} />
    </div>
  );
}

export default App;
