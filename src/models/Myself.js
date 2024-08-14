import {sendPost, sendGet} from '@/models/ApiCall';

async function getMe() {
    
    const response = await sendGet(`/users/me`, true);
    return response.data;
    
}

export {getMe}