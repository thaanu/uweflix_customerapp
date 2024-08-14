<script setup >
import {getMyTickets} from '@/models/Bookings.js';
import SessionLayout from '@/layouts/SessionLayout.vue'
import { onBeforeMount, ref } from 'vue';
import Alert from '@/components/Alerts.vue';
import TicketTag from '@/components/TicketTag.vue';

const serverError = ref(undefined);
const isLoading = ref(false);
const myBookings = ref([]);

onBeforeMount( async () => {
    isLoading.value = true;

    try {
        const allMyTickets = await getMyTickets();
        const filteredTickets = [];
        allMyTickets.forEach(ticket => {
            const x = ticket;
            // Manipulate
            filteredTickets.push(x);
        });
        myBookings.value = filteredTickets;
    }
    catch ( err ) {
        serverError.value = err.message;
    }

    isLoading.value = false;
} );
</script>

<template>
    <SessionLayout>
        <div class="container my-5">
            <h3 class="mb-5 text-uppercase"><i style="margin-right: 10px;" class="fas fa-ticket"></i> My Tickets</h3>
            <Alert v-if="serverError" :message="serverError" alerttype="alert-danger" icon="fas fa-circle-exclamation" />
            <p v-if="isLoading">Loading</p>
            <TicketTag v-else :myBookings="myBookings" />
            <Alert v-if="myBookings.length === 0" message="You do not have any tickets" alerttype="alert-info" icon="fas fa-circle-info" />
        </div>
    </SessionLayout>
</template>