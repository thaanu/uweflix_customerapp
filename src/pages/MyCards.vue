<script setup>
import { extractUser } from '@/helpers/User.js';
import { onBeforeMount, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import {getPersonalAccount} from '@/models/Accounts.js';
import SessionLayout from '@/layouts/SessionLayout.vue';
import Alert from '@/components/Alerts.vue';
import { getUserCards, createNewCard } from '@/models/Cards';
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
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between items-align-center">
                                                <div>
                                                    <p><i class="fa-regular fa-credit-card" style="margin-right: 10px"></i>{{ card.holder_name }}</p>
                                                </div>
                                                <button class="btn btn-sm btn-outline-primary">Edit</button>
                                            </div>
                                            <p>{{ card.card_number }}</p>
                                            <p>{{ card.exp_date }}</p>
                                        </div>
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