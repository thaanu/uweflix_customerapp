import {sendPost, sendGet, changeHeaderAttribute } from '@/models/ApiCall';

async function getUserCards() {
    changeHeaderAttribute('Content-Type', 'application/json');
    changeHeaderAttribute('Accept', 'application/json');
    const userPassword = localStorage.getItem('user_pass');
    const response = await sendGet(`/accounts/cards/user/cards/${userPassword}`, true);
    return response.data;
}

async function createNewCard(payload) {
    const response = await sendPost(`/accounts/cards/card`, payload, true);
    return response.data;
}

export {getUserCards, createNewCard}