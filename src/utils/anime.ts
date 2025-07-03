import axios from 'axios';
import scrapeSingleAnime from '@/lib/scrapeSingleAnime';
import type { anime as animeType } from '@/types/types';

const { BASEURL } = process.env;

const anime = async (slug: string): Promise<animeType | undefined> => {
  if (!BASEURL) {
    throw new Error('BASEURL is not defined in environment variables.');
  }

  try {
    const { data } = await axios.get(`${BASEURL}/anime/${slug}`);
    const result = scrapeSingleAnime(data);

    if (!result) {
      throw new Error('Anime data not found or page structure has changed.');
    }

    return result;
  } catch (error: any) {
    console.error('Error fetching anime:', error.message);
    throw new Error('Failed to fetch anime data.');
  }
};

export default anime;
