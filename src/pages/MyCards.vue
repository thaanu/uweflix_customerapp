<script setup>
import { extractUser } from '@/helpers/User.js';
import { onBeforeMount, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import {getPersonalAccount} from '@/models/Accounts.js';
import SessionLayout from '@/layouts/SessionLayout.vue';
import Alert from '@/components/Alerts.vue';
import { getUserCards, createNewCard, creditCardType } from '@/models/Cards';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const user = JSON.parse(localStorage.getItem('user'));
const userFromToken = extractUser();
const user_account = JSON.parse(localStorage.getItem('user_account'));

const isClubRap = ref(userFromToken.is_club_rep);

const serverError = ref(undefined);
const isLoading = ref(false);

const myCards = ref({});

const form = ref({
    card_holder_name: null,
    card_number: null,
    expiry_date: null,
    account_id: user_account.id ?? null
});

const getCardIcon = ( cardType ) => {
    switch (cardType) {
        case 'MASTERCARD':
            return 'fa-brands fa-cc-mastercard';
            break;
        case 'VISA':
            return 'fa-brands fa-cc-visa';
            break;
    
        default:
            break;
    }
}

const dFormat = (dateString) => {
    const dt = new Date(dateString);
    let year  = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day   = dt.getDate().toString().padStart(2, "0");
    return `${month}/${year}`;

}

const createCard = async () => {
    isLoading.value = true;
    const payload = {
        id: 0,
        account_id : form.value.account_id,
        card_number : form.value.card_number,
        holder_name : form.value.card_holder_name,
        exp_date : form.value.expiry_date,
        status : "ENABLED",
        user_password : localStorage.getItem('user_pass'),
        class_name : "CardInput"
    }
    try {
        const response = await createNewCard(payload);
        myCards.value = await getUserCards();
    } catch (err) {
        alert("Error occured");
    } 
    isLoading.value = false;
}

onBeforeMount( async () => {
    isLoading.value = true;
    myCards.value = await getUserCards();
    isLoading.value = false;
} );

</script>

<template>
    <SessionLayout>
        <div class="container my-5">
            <h3 class="mb-5 text-uppercase"><i style="margin-right: 10px;" class="fas fa-credit-card"></i> My Cards</h3>
            <div class="row">
                <Alert v-if="serverError" :message="serverError" alerttype="alert-danger" icon="fas fa-circle-exclamation" />
                <template v-else>
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <form @submit.prevent="createCard" method="post">
                                        <h6>Create New Card</h6>
                                        <hr>
                                        <div class="mb-3">
                                            <label for="card_holder_name">Card Holder Name</label>
                                            <input type="text" for="card_holder_name" required class="form-control" v-model="form.card_holder_name" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="card_number">Card Number</label>
                                            <input type="text" for="card_number" required class="form-control" v-model="form.card_number" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="expiry_date">Expiry Date</label>
                                            <input type="date" for="expiry_date" required class="form-control" v-model="form.expiry_date" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="account_id">Account</label>
                                            <select id="account_id" v-model="form.account_id" class="form-select">
                                                <option :value="user_account.id">Personal</option>
                                                <!-- <option value="{{ user_account.id }}">Club Account</option> -->
                                            </select>
                                        </div>
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-outline-primary">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="row">
                                <div v-for="card in myCards" class="col-lg-6 mb-3">
                                    <div class="my-card">
                                        <i class="card-icon" :class="getCardIcon(creditCardType(card.card_number))"></i>
                                        <i class="fa-solid fa-wifi"></i>
                                        <div class="card-number">{{ card.card_number }}</div>
                                        <div class="title">{{ card.holder_name }}</div>
                                        <div class="expiry-date">{{ dFormat(card.exp_date) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </SessionLayout>
</template>

<style>
.my-card {

    color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    border-radius: 10px;
    max-height: 300px;
    height: 230px;
    background: url(https://plus.unsplash.com/premium_photo-1666286163385-abe05f0326c4?q=80&w=3175&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center center;
    background-size: cover;
    position: relative;
}

.my-card .title {
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    position: absolute;
    bottom: 30px;
    left: 20px;
    font-size: 1.2rem;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
}
.my-card .card-icon {
    font-size: 3rem;
    position: absolute;
    top: 10px;
    right: 10px;
}
.my-card .fa-wifi {
    position: absolute;
    top: 70px;
    left: 50px;
    font-size: 2.5rem;
    color: #fff;
    transform: rotate(90deg);
}
.my-card .card-number {
    letter-spacing: 6px;
    font-size: 1.2rem;
    position: absolute;
    bottom: 70px;
    left: 20px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
}
.my-card .expiry-date {
    font-size: 1rem;
    color: #fff;
    position: absolute;
    bottom: 70px;
    right: 20px;
}
</style>