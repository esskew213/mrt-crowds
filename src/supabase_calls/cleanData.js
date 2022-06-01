export const cleanData = (arr) => {
  const cleanedData = arr.map((el) => {
    const obj = {};
    obj.stn_code = el.Station;
    obj.retrieved_at = new Date(el.StartTime);
    obj.crowd_level = el.CrowdLevel;
    return obj;
  });
  return cleanedData;
};
