import React, { useEffect, useState } from 'react';
import Switch from './components/Switch';
import MapComponent from './mapComponents/MapComponent';
import { getMRTLines } from './supabase_calls/getMRTLines';
import RefreshButton from './components/RefreshButton';
function App() {
  const [allLines, setAllLines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLine, setSelectedLine] = useState('');
  const [crowdData, setCrowdData] = useState([]);
  useEffect(() => {
    getMRTLines()
      .then((data) => {
        setIsLoading(true);
        const lines = data.map((l) => l['mrt_line']);
        setAllLines(lines);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className='App'>
      <h1>Hello</h1>
      <Switch
        allLines={allLines}
        setAllLines={setAllLines}
        selectedLine={selectedLine}
        setSelectedLine={setSelectedLine}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setCrowdData={setCrowdData}
      />
      <RefreshButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        allLines={allLines}
      />
      <MapComponent crowdData={crowdData} />
    </div>
  );
}

export default App;
