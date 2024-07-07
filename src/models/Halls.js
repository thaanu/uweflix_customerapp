import {sendPost, sendGet} from '@/models/ApiCall';

async function getHallById(hallId) {
    const response = await sendGet(`/films/halls/hall/id/${hallId}`, true);
    return response.data;
}

export { getHallById }
