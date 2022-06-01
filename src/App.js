import React, { useEffect, useState } from 'react';
import Switch from './components/Switch';
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
  }, [allLines]);

  return (
    <div className='App'>
      <h1>How crowded is your MRT?</h1>
      {lastUpdated && (
        <p>
          Last updated at{' '}
          {lastUpdated?.toLocaleDateString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
      )}
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
