import {sendPost, sendGet} from '@/models/ApiCall';

async function getMovies() {
    const response = await sendGet(`/films/films?start=1&limit=999`, true);
    return response.data;
}

export { getMovies }
