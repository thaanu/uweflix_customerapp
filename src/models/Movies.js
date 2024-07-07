import {sendPost, sendGet} from '@/models/ApiCall';

async function getMovies() {
    const response = await sendGet(`/films/films?start=1&limit=999`, true);
    return response.data;
}

async function getOneMovieById( movieId ) {
    const response = await sendGet(`/films/film/${movieId}`, true);
    return response.data;
}

async function getMovieSchedule( movieId ) {
    const response = await sendGet(`/films/film/schedules/id/${movieId}`, true);
    return response.data;
}

async function getScheduleById(scheduleId) {
    const response = await sendGet(`/films/schedules/schedule/${scheduleId}`);
    return response.data;
}

export { getMovies, getOneMovieById, getMovieSchedule, getScheduleById }
