import { supabase } from '../supabaseClient';

export const retrieveDateFromDatabase = async () => {
  try {
    let { data, error, status } = await supabase
      .from('crowd_levels')
      .select()
      .limit(1);
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      const [{ retrieved_at: dateStrToCheck }] = data;
      return dateStrToCheck;
    }
  } catch (err) {
    console.error(err);
  }
};

const checkifDataOutdated = (dateStrToCheck, acceptableDiffInMinutes) => {
  // converting to milliseconds
  return (
    Date.now() - new Date(dateStrToCheck).getTime() >
    acceptableDiffInMinutes * 60000
  );
};

export const isDataOutdated = async (acceptableDiffInMinutes) => {
  const dateStrToCheck = await retrieveDateFromDatabase();
  const dataIsOutdated = checkifDataOutdated(
    dateStrToCheck,
    acceptableDiffInMinutes
  );

  return dataIsOutdated;
};
