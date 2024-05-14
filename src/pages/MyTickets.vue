<template>
    <SessionLayout>
        <div class="container my-5">
            <h3 class="mb-5 text-uppercase"><i style="margin-right: 10px;" class="fas fa-ticket"></i> My Tickets</h3>
            <ticket-tag :tickets="tickets" />
        </div>
    </SessionLayout>
</template>

<script setup >
import SessionLayout from '@/layouts/SessionLayout.vue'
</script>

<script>
import TicketTag from '@/components/TicketTag.vue';
export default {
    components: {
        'ticket-tag' : TicketTag
    },
    data() {
        return {
            tickets: [
                {
                    ticket_no: 1111,
                    datetime: '2024-05-11 15:30:00',
                    qty: 2,
                    movie_id: 112,
                    price: 80,
                    status: 'on-schedule'
                },
                {
                    ticket_no: 1114,
                    datetime: '2024-05-15 16:30:00',
                    qty: 1,
                    movie_id: 113,
                    price: 40,
                    status: 'on-schedule'
                }
            ]
        }
    }
}
</script>