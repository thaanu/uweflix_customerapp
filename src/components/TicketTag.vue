<template>
    <div class="row">
        <div v-for="ticket in tickets" class="col-lg-3 mb-3" >
            <div class="card ticket-card">
                <div class="img-cover card-img-top">
                    <img src="https://placehold.co/400x600" class="img-fluid" alt="">
                </div>
                <div class="card-body">
                    <p><i class="fas fa-ticket" style="margin-right: 20px;"></i> {{ ticket.ticket_no }}</p>
                    <p><i class="fas fa-people-group" style="margin-right: 20px;"></i> {{ ticket.qty }}</p>
                    <p><i class="fas fa-money-bill" style="margin-right: 20px;"></i> <span class="fw-bold">${{ ticket.price }}</span></p>
                    <p><i class="far fa-calendar" style="margin-right: 20px;"></i> {{ ticket.datetime }}</p>
                    <p class="text-center fw-bold">{{ ticket.status }}</p>
                    <a href="#" class="d-block btn btn-outline-primary"><i class="fas fa-qrcode"></i> View QR Code</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['tickets']
}
</script>

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