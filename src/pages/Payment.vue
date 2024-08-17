
<script setup>
import {getAccountDetails} from '@/helpers/User.js';
import { makeReservation } from '@/models/Movies.js';
import { getUserCreditCard } from '@/models/CreditCard.js';

import { useRouter } from 'vue-router';
import SessionLayout from '@/layouts/SessionLayout.vue';
import Alert from '@/components/Alerts.vue';
import { computed, ref } from 'vue';

const router = useRouter();

let scheduleId = parseInt(localStorage.getItem('schedule_id'));

const userAccountDetails = getAccountDetails();
const userAccountType = localStorage.getItem('account_type');

const serverError = ref(undefined);
const isLoading = ref(false);
const processBookingSubmision = ref(false);

let theSelectedSeats = ref([]);
let billing = ref({});
let creditCard = ref([]);
let uweFlexAccountBalance = ref(userAccountDetails.balance);
let uweFlexAccountBalanceAfter = ref(0);

let creditCardAuth = ref(false);

let loggedUserEmail = localStorage.getItem('user_email').split('@')[0];

let tupForm = {
    password: null
}

let submission = ref({
    payment_method: 'uweflex-account'
});

theSelectedSeats.value = localStorage.getItem('seat_numbers');
billing.value = JSON.parse(localStorage.getItem('billing_info'));

let authUser = JSON.parse(localStorage.getItem('user'));

let userId = authUser.id;

let noMoney = computed(() => {
    return (uweFlexAccountBalance.value < billing.value.total ? true : false);
});

// Todo: Work on this later
const authTopUp = () => {
    let resp = getUserCreditCard(tupForm.password);
}

let batchRef = ref(null);

let submitBooking = async () => {

    let processed = 0;

    try {
        processBookingSubmision.value = true;

        let selectedSeats = JSON.parse(theSelectedSeats.value);

        try {
            
            let payload = {
                bookings: [],
                club_id : 0,
                schedule_id : scheduleId,
                account_id : userAccountDetails.id,
                cash : 0,
                class_name : "MULTIPLE_BOOKINGS"
            }
            
            // Add all the seats
            for ( let i = 0; i < selectedSeats.length; i++ ) {
                payload.bookings.push({
                    seat_no : selectedSeats[i].seat_number,
                    person_type_id : selectedSeats[i].person_type,
                    user_id : userId
                });
            }
            
            let response = await makeReservation(payload);

            batchRef.value = response[0].batch_ref;

        }
        catch (err) {
            processBookingSubmision.value = false;
            console.error(err);
        }


        processBookingSubmision.value = false;
        
        await router.push({name: 'view-ticket', params:{bref: batchRef.value}})
        
    }
    catch ( err ) {
        console.log(err)
    }
}

uweFlexAccountBalanceAfter.value = uweFlexAccountBalance.value - billing.value.total;


</script>

<template>
    <SessionLayout>
        <div class="container">
            <div class="my-5">
                <header class="mb-3">
                    <h3>Payment</h3>
                    <hr>
                </header>
                <div>

                    <p>Your UWE Flex Account Balance</p>

                    <Alert alerttype="alert alert-warning" v-if="noMoney">
                        You are required to pay £{{ billing.total }}, but your account balance is £{{ uweFlexAccountBalance }}. Please top-up your account.
                    </Alert>

                    <div class="row">
                        <div class="col-lg-6 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <h1 class="text-uppercase">{{ loggedUserEmail }}</h1>
                                        <button :disabled="noMoney" @click="submitBooking" class="btn btn-success btn-lg">
                                            <i class="fas fa-circle-check" style="margin-right: 5px"></i>
                                            Pay Now
                                        </button>
                                    </div>
                                    <p class="text-uppercase">{{userAccountType}}</p>
                                    <p><span class="text-success" style="font-size: 4rem; display: block;">£{{ uweFlexAccountBalance }}</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">

                            <div class="card" v-if="!noMoney">
                                <div class="card-body">
                                    <h5>Payment Summary</h5>

                                    <ul class="list-group mb-3">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Qty
                                            <span>{{ billing.number_of_tickets }}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Ticket Price
                                            <span>£{{ billing.ticket_price.toFixed(2) }}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Subtotal
                                            <span>£{{ billing.subtotal.toFixed(2) }}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Discount
                                            <span>£{{ billing.discount.toFixed(2) }}</span>
                                        </li>
                                        <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                            GST 8%
                                            <span>{{ billing.gst }}</span>
                                        </li> -->
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Total
                                            <span>£{{ billing.total.toFixed(2) }}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Balance
                                            <span>£{{ uweFlexAccountBalanceAfter.toFixed(2) }}</span>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                            <div v-if="noMoney">
                                <form @submit.prevent="authTopUp" v-if="!creditCardAuth">
                                    <p>Please enter the password to retreive your credit card information</p>
                                    <div class="mb-3">
                                        <input type="password" id="password" v-model="tupForm.password" class="form-control" placeholder="Passsword" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>

                                <form @submit.prevent="toTopup" v-if="creditCardAuth">
                                    <h3 class="mb-3">Top Up Now</h3>
                                    <div class="mb-3">
                                        <label for="credit-card-name" class="sr-only">Credit Card Name</label>
                                        <input type="text" class="form-control" id="credit-card-name" placeholder="Credit Card Name" >
                                    </div>
                                    <div class="mb-3">
                                        <label for="credit-card-number" class="sr-only">Credit Card Number</label>
                                        <input type="text" class="form-control" id="credit-card-number" placeholder="Credit Card Number" >
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div class="mb-3">
                                            <label for="credit-card-expiry">Credit Card Expiry Date</label>
                                            <input type="date" class="form-control" placeholder="Credit Card Expiry" >
                                        </div>
                                        <div class="mb-3">
                                            <label for="credit-card-security" class="sr-only">Security Code</label>
                                            <input type="password" class="form-control" placeholder="Credit Card Security Code" >
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="processBookingSubmision" class="processing_tickets">
            <div class="palert">
                <i class="fas fa-spin fa-spinner"></i>
                Processing
            </div>
        </div>

    </SessionLayout>
</template>

<style>
.processing_tickets {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
}

.palert {
    background: rgb(4, 195, 4);
    width: 300px;
    position: fixed;
    right: 20px;
    top: 40px;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
}

</style>