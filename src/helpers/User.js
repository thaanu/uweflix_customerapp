const extractUser = () => {
    const chunk = localStorage.getItem('user_token');
    const exp = chunk.split('.');
    const decoded = atob(exp[1]);
    return JSON.parse(decoded);
}
const getAccountDetails = () => {
    return JSON.parse(localStorage.getItem('user_account'));
}
export { extractUser, getAccountDetails }