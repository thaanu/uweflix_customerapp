<script setup>
import { useRouter } from 'vue-router';
import SessionLayout from '@/layouts/SessionLayout.vue';
import Alert from '@/components/Alerts.vue';
import { computed, ref } from 'vue';
import { getAccountDetails, getClubAccountDetails } from '@/helpers/User.js';
import { makeReservation } from '@/models/Movies.js';

const router = useRouter();

const serverError               = ref(undefined);
const isLoading                 = ref(false);
const processBookingSubmision   = ref(false);

const userAccountDetails    = getAccountDetails();
const clubAccountDetails    = getClubAccountDetails();
const selectedAccountType   = localStorage.getItem('account_type');

let scheduleId          = parseInt(localStorage.getItem('schedule_id'));
let authUser            = JSON.parse(localStorage.getItem('user'));
let loggedUserEmail     = localStorage.getItem('user_email').split('@')[0];
let billing             = ref(JSON.parse(localStorage.getItem('billing_info')));
let batchRef            = ref(null);
let theSelectedSeats    = ref(localStorage.getItem('seat_numbers'));
let userId              = authUser.id;


// By default use the personal account information
let accountId               = userAccountDetails.id;
let clubId                  = 0;
let accountBalance          = ref(userAccountDetails.balance);
let accountBalanceAfter     = ref(0);

// Update the account id and club id
if ( selectedAccountType == 'club' ) {
    accountId = clubAccountDetails.account.id;
    clubId = clubAccountDetails.id;
    accountBalance.value = clubAccountDetails.account.balance;
}


let noMoney = computed(() => {
    return (accountBalance.value < billing.value.total ? true : false);
});

let submitBooking = async () => {

    try {
        processBookingSubmision.value = true;

        let selectedSeats = JSON.parse(theSelectedSeats.value);

        try {
            
            let payload = {
                bookings: [],
                club_id : clubId,
                schedule_id : scheduleId,
                account_id : accountId,
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

accountBalanceAfter.value = accountBalance.value - billing.value.total;

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
                        You are required to pay £{{ billing.total }}, but your account balance is £{{ accountBalance }}. Please top-up your account.
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
                                    <p class="text-uppercase">{{selectedAccountType}}</p>
                                    <p><span class="text-success" style="font-size: 4rem; display: block;">£{{ accountBalance }}</span></p>
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
                                            <span>£{{ accountBalanceAfter.toFixed(2) }}</span>
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