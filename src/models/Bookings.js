import {sendPost, sendGet} from '@/models/ApiCall';

async function getMyTickets() {
    const response = await sendGet(`/bookings/users/bookings/me`, true);
    return response.data;
}

export { getMyTickets }
