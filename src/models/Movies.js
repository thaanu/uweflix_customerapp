import {sendPost, sendGet} from '@/models/ApiCall';
const baseUrl = 'https://api.uweflix.naffah.me';

async function getMovies() {
    const response = await sendGet(`${baseUrl}/films/films?start=1&limit=999`, true);
    return response.data;
}

export { getMovies }
