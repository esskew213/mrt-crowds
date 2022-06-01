import { supabase } from '../supabaseClient';
export const retrieveFromDatabase = async (line) => {
  try {
    let { data, error, status } = await supabase
      .from('crowd_levels')
      .select('*, stations!inner(*)')
      .eq('stations.mrt_line', line);

    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};
