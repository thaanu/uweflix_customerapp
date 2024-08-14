<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const props = defineProps({
    myBookings: Object
})

const viewTicket = async (batchReference) => {
    await router.push({name: 'view-ticket', params: {bref: batchReference}});
}

</script>

<template>
    <div v-for="ticket in myBookings" class="mb-3" >
        <div class="card ticket-card">
            <div class="card-body">
                <div class="row">
                    <div class="col"><i class="fas fa-money-bill" style="margin-right: 10px;"></i> {{ ticket.amount }}</div>
                    <div class="col"><i class="fas fa-calendar" style="margin-right: 10px;"></i> {{ ticket.created }}</div>
                    <div class="col"><i class="fas fa-check-circle" style="margin-right: 10px;"></i> {{ ticket.status }}</div>
                    <div class="col">
                        <button @click="viewTicket(ticket.batch_ref)" class="btn-sm d-block btn btn-outline-primary">View Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.img-cover {
    height: 300px;
    overflow: hidden;
    position: relative;
}
.img-cover img {
    position: absolute;
    top:0;
    bottom: 0;
    margin: auto;
}
</style>