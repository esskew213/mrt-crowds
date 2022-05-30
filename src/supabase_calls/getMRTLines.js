import { supabase } from '../supabaseClient';

export const getMRTLines = async () => {
  try {
    let { data, error, status } = await supabase
      .from('mrt_lines')
      .select('mrt_line');

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
