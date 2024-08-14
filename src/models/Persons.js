import {sendPost, sendGet} from '@/models/ApiCall';

async function getPersonTypes() {
    const response = await sendGet(`/bookings/person-types/person-types?start=1&limit=1000`, true);
    return response.data;
}

export { getPersonTypes }
