import axios from "axios";
const baseUrl = 'https://api.uweflix.naffah.me';
export async function authenticate(email, password) {
    const response = await axios.post( `${baseUrl}/token`, { username: email,  password: password}, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });

    console.log('response',response);
    console.log('status',response.response.status);
    // todo: find a way to error handle axios

    if (response.response.status != 200) {
        let notify = document.querySelector('#login_notification');
        notify.style.display = 'block';
        notify.textContent = response.response.statusText;
        return false;
    } else {
        localStorage.setItem('user_token', response.data.access_token);
        return true;
    }


    // .then(() => {
    //     
    // }).catch((error) => {
    //     // error.response.status
    //     console.log(error);
    //     
    // })
    
}

// nishawl.naseer@outlook.com
// h0KcT2U8tFJZ5H1LSexLBQ6T