<script setup>
import { getPersonTypes } from '@/models/Persons.js';
import { getHallById } from '@/models/Halls.js';
import { getScheduleById } from '@/models/Movies.js';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { getBookedTickets, sendBooking } from '@/models/Bookings.js';
import SessionLayout from '@/layouts/SessionLayout.vue';
import Alert from '@/components/Alerts.vue';
import CinemaHall from '@/components/CinemaHall.vue';
import { onBeforeMount, ref } from 'vue';

const route = useRoute();
const router = useRouter();

let movieId = route.params.movieid;
let scheduleId = route.params.scheduleid;
let hallId = route.params.hallid;

const serverError = ref(undefined);
const isLoading = ref(false);
const processBookingSubmision = ref(false);
const theHall = ref([]);
const bookedSeats = ref([]);
const showLayover = ref(false);

let theSelectedSeats = ref([]);

let billing = ref({
    number_of_tickets: 0,
    ticket_price: 0,
    discount: 0,
    gst: 0,
    subtotal: 0,
    total: 0
});

// Recalculating after adding discounts
const recalculate = () => {
    let totalDiscount = 0;
    // Calculate discounts
    theSelectedSeats.value.forEach(seat => {
        personTypes.forEach(pt => {
            if ( seat.person_type == pt.id ) {
                seat.discount = (billing.value.ticket_price * pt.discount_amount) / 100;
                totalDiscount = totalDiscount + seat.discount;
            }
        });
    });
    billing.value.discount = totalDiscount;
    billing.value.total = billing.value.subtotal - totalDiscount;
}

const calculateTickets = (selectedTickets) => {

    theSelectedSeats.value = [];

    selectedTickets.forEach(seat => {
        theSelectedSeats.value.push({
            seat_number: seat,
            price: null,
            person_type: null
        });
    });

    let totalTickets = selectedTickets.length;
    let subtotal = totalTickets * billing.value.ticket_price;
    let gst = 0; // Not using GST for this demo
    let total = subtotal + gst;

    billing.value.number_of_tickets = totalTickets;
    billing.value.subtotal = subtotal;
    billing.value.total = total;

}

let personTypes = [];

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

    personTypes = await getPersonTypes();

    isLoading.value = false
} );

let submitBooking = async () => {
    try {
        processBookingSubmision.value = true;

        localStorage.setItem('hall', JSON.stringify(theHall.value));
        localStorage.setItem('schedule_id', scheduleId);
        localStorage.setItem('seat_numbers', JSON.stringify(theSelectedSeats.value));
        localStorage.setItem('billing_info', JSON.stringify(billing.value));

        router.push('/payment');
        
    }
    catch ( err ) {
        processBookingSubmision.value = false;
        console.log(err)
    }
}

</script>

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
                    <CinemaHall v-if="!isLoading" :bookedSeats="bookedSeats" :hall="theHall" :selectSeats="calculateTickets" @customerSelectedSeats="calculateTickets" />
                    
                    <button v-if="billing.number_of_tickets > 0" style="position:fixed; top:100px; left:20px; transition: all 0.1s ease-in-out;" @click="showLayover=true" class="btn btn-primary btn-lg">Checkout</button>

                    <div style="transition: all 0.2s ease-in-out; position: fixed; right: -320px; width: 320px; top: 0; background: white; padding: 20px; box-shadow: -10px 0 20px rgba(0,0,0,0.2); height: 100vh; overflow: scroll;" :class="{'slide-in':showLayover}">

                        <!-- Show all the tickets -->
                        <p>Please select who's watching</p>
                        <div v-for="(seat, i) in theSelectedSeats">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="mb-3">Seat # {{ seat.seat_number }}</div>
                                    <select @change="recalculate" class="form-select" v-model="theSelectedSeats[i].person_type" >
                                        <option :value="person.id" v-for="person in personTypes" >{{ person.person_type }}</option>
                                    </select>
                                    <small v-if="seat.discount" class="mt-2 d-block">Ticket Discount <strong>{{ seat.discount }}</strong></small>
                                </div>
                            </div>
                        </div>

                        <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Qty
                                <span>{{ billing.number_of_tickets }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Ticket Price
                                <span>{{ billing.ticket_price.toFixed(2) }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Subtotal
                                <span>{{ billing.subtotal.toFixed(2) }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Discount
                                <span>{{ billing.discount.toFixed(2) }}</span>
                            </li>
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                GST 8%
                                <span>{{ billing.gst }}</span>
                            </li> -->
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Total
                                <span>{{ billing.total.toFixed(2) }}</span>
                            </li>
                        </ul>

                        <button type="button" @click="submitBooking" class="btn btn-success btn-lg"><i class="fas fa-check-double"></i> Checkout</button>
                        <button type="button" @click="showLayover=false" class="btn btn-lg" >Cancel</button>

                    </div>

                </div>
            </div>
        </div>
    </SessionLayout>
</template>

<style>
.slide-in {
    transform: translateX(-320px);
}
</style>