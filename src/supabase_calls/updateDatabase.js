import { supabase } from '../supabaseClient';
export const updateDatabase = async (arr) => {
  console.log('going to upsert', arr);
  try {
    const { data, error, count } = await supabase
      .from('crowd_levels')
      .upsert(arr, {
        count: 'exact',
        onConflict: 'stn_code',
      });
    if (error) {
      throw error;
    }
    return count;
  } catch (err) {
    console.log(err);
  }
};
