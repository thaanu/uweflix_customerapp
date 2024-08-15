<script setup >
import {getSingleTicket} from '@/models/Bookings.js';
import SessionLayout from '@/layouts/SessionLayout.vue'
import { onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Alert from '@/components/Alerts.vue';
import TicketTag from '@/components/TicketTag.vue';

const route = useRoute();

const serverError = ref(undefined);
const isLoading = ref(false);
const myBookings = ref([]);
const theBooking = ref({});

onBeforeMount( async () => {
    isLoading.value = true;
    try {
        theBooking.value = await getSingleTicket(route.params.bref);
    }
    catch ( err ) {
        serverError.value = err.message;
    }
    isLoading.value = false;
} );
</script>

<template>
    <SessionLayout>
        <div class="py-5">
            <div class="container">
                <h2 class="mb-5">Your Booking Information</h2>
                <Alert v-if="serverError" :message=serverError alerttype="alert-danger" icon="fas fa-circle-info" />
                <template v-else>
                    <div class="row">
                        <div v-for="ticket in theBooking" class="col-lg-4 col-md-6 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <i class="fa-solid fa-film" style="font-size: 3rem;"></i>
                                        <div style="font-size: 3rem; line-height: 0;">{{ ticket.seat_no }}</div>
                                    </div>
                                    <p style="font-weight: 800; font-size: 1.5rem;">{{ ticket.schedule.film.title }}</p>
                                    <p>Show Time : {{ ticket.schedule.show_time }}</p>
                                    <p>Cinema Hall : {{ ticket.schedule.hall.hall_name }}</p>
                                    <p>Age Rating: {{ ticket.schedule.film.age_rating }}</p>
                                    <code style="font-size: 1.2rem;" class="fst-italic">{{ ticket.batch_ref }}</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </SessionLayout>
</template>