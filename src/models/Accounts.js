import {sendPost, sendGet} from '@/models/ApiCall';

async function getPersonalAccount(userId) {
    const response = await sendGet(`/accounts/user/account/${userId}`, true);
    return response.data;
}

async function getClubAccount(clubId) {
    const response = await sendGet(`/accounts/user/account/${clubId}`, true);
    return response.data;
}

async function topupAccount(payload) {
    const response = await sendPost(`/accounts/account/top-up`, payload, true);
    return response.data;
}

export {getPersonalAccount, getClubAccount, topupAccount}