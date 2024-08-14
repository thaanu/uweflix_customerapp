import {sendPost, sendGet} from '@/models/ApiCall';

async function getUserCreditCard(password) {
    const response = await sendGet(`/accounts/cards/user/cards/id/${password}`, true);
    return response.data;
}

async function getClubCreditCard(password) {
    const response = await sendGet(`/accounts/cards/club/cards/id/user_password=${password}`, true);
    return response.data;
}

export { getUserCreditCard, getClubCreditCard }
