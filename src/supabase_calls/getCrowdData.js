import { cleanData } from './cleanData';
import { updateDatabase } from './updateDatabase';

export const getCrowdData = async (line) => {
  const config = {
    method: 'GET',
    headers: { AccountKey: process.env.REACT_APP_LTA_ACCOUNT_KEY },
  };
  const proxy = process.env.REACT_APP_PROXY;
  const baseURL = `http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime?TrainLine=`;
  try {
    await fetch(proxy + baseURL + line, config)
      .then((res) => res.json())
      .then(({ value }) => cleanData(value))
      .then((cleanedData) => updateDatabase(cleanedData));
  } catch (err) {
    console.log(err);
  }
};
