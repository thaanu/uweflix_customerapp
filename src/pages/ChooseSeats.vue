<template>
    <SessionLayout>
        <div v-if="processBookingSubmision" style="background: rgba(0,0,0,0.8); position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: 1000; ">
            <div style="display: flex; height: 100%; align-items: center; justify-content: center;">
                <i style="color: rgba(255,255,255,0.5); font-size: 5rem;" class="fas fa-spin fa-spinner"></i>
            </div>
        </div>
        <div class="container my-5">
            <h3 class="text-center mb-5 text-uppercase">Choose Seats</h3>
            <div class="row">
                <Alert v-if="serverError" :message="serverError" alerttype="alert-danger" icon="fas fa-circle-exclamation" />
                <p v-if="isLoading"><i class="fas fa-spin fa-spinner"></i> Loading Movie Information</p>
                <div v-if="!serverError" class="mb-5">
                    <div class="row">
                        <div class="col-lg-8">
                            <CinemaHall v-if="!isLoading" :bookedSeats="bookedSeats" :hall="theHall" :selectSeats="calculateTickets" @customerSelectedSeats="calculateTickets" />
                        </div>
                        <div class="col-lg-4" v-if="billing.number_of_tickets > 0">
                            <ul class="list-group mb-3">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total Tickets
                                    <span>{{ billing.number_of_tickets }}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Subtotal
                                    <span>{{ billing.subtotal }}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    GST 8%
                                    <span>{{ billing.gst }}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total
                                    <span>{{ billing.total.toFixed(2) }}</span>
                                </li>
                            </ul>

                            <button type="button" @click="submitBooking" class="btn btn-success btn-lg"><i class="fas fa-check-double"></i> Checkout</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SessionLayout>
</template>

<script setup>

import { RouterLink, useRoute } from 'vue-router';
import { getHallById } from '@/models/Halls.js';
import { getBookedTickets, sendBooking } from '@/models/Bookings.js';
import { getScheduleById } from '@/models/Movies.js';
import SessionLayout from '@/layouts/SessionLayout.vue';
import Alert from '@/components/Alerts.vue';
import CinemaHall from '@/components/CinemaHall.vue';
import { onBeforeMount, ref } from 'vue';

const route = useRoute();

let movieId = route.params.movieid;
let scheduleId = route.params.scheduleid;
let hallId = route.params.hallid;

const serverError = ref(undefined);
const isLoading = ref(false);
const processBookingSubmision = ref(false);
const theHall = ref([]);
const bookedSeats = ref([]);

let theSelectedSeats = ref([]);

let billing = ref({
    number_of_tickets: 0,
    ticket_price: 0,
    gst: 0,
    subtotal: 0,
    total: 0
});

const calculateTickets = (selectedTickets) => {

    theSelectedSeats.value = selectedTickets;

    let totalTickets = selectedTickets.length;
    let subtotal = totalTickets * billing.value.ticket_price;
    let gst = (subtotal * 8) / 100;
    let total = subtotal + gst;

    billing.value.number_of_tickets = totalTickets;
    billing.value.subtotal = subtotal;
    billing.value.gst = gst;
    billing.value.total = total;
}

onBeforeMount( async () => {
    isLoading.value = true;

    // Get seats information
    try {
        theHall.value = await getHallById(hallId);
        bookedSeats.value = await getBookedTickets(scheduleId);

        // Fetch schedule
        const schedule = await getScheduleById(scheduleId);

        billing.value.ticket_price = schedule.ticket_price;

    }
    catch ( err ) {
        serverError.value = err.message;
    }

    isLoading.value = false
} );

let submitBooking = async () => {
    try {
        processBookingSubmision.value = true;
        // const response = await sendBooking({
        //     "schedule_id" : null,
        //     "selected_seats" : []
        // });
        setTimeout(function(){
            processBookingSubmision.value = false;
        }, 5000);
    }
    catch ( err ) {
        console.log(err)
    }
}

</script>

