import {sendPost, sendGet} from '@/models/ApiCall';

async function getMyTickets() {
    const response = await sendGet(`/bookings/users/bookings/me`, true);
    return response.data;
}

async function getBookedTickets( scheduleid ) {
    const response = await sendGet(`/bookings/bookings/booked-seats/${scheduleid}`, true);
    return response.data;
}

async function sendBooking( payload ) {
    const response = await sendPost(``, payload)
    return response.data;
}

export { getMyTickets, getBookedTickets, sendBooking }
