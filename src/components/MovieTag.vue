<template>
    <div v-for="movie in movies" class="col-sm-6 col-lg-3 mb-3">
        <div class="card movie-card" @click="movie.show_desc=!movie.show_desc">
            <div style="height: 450px; background: white; overflow: hidden;">
                <img v-if="!movie.poster_image" src="@/assets/dummy.jpeg" >
                <img v-else :src="movie.poster_image" class="img-fluid card-img-top" style="height: 100%" :alt="movie.title">
            </div>
            <div class="card-body">
                <div style="position: absolute; background-color: white; top: 0; left: 0; padding: 10px; height: 100%; width: 100%;" v-show="movie.show_desc">{{ movie.trailer_desc }}</div>
                <div class="mb-3">
                    <i class="fas fa-star text-warning"></i> {{ movie.rate }}
                    <RouterLink style="margin-left: 10px;" :to="'/more-info/' + movie.id"><i
                            style="margin-right: 5px;" class="fas fa-circle-info"></i></RouterLink>
                </div>
                <h6 class="mb-3">{{ movie.title }}</h6>
                <RouterLink v-if="movie.is_active" class="d-block btn btn-outline-success"
                    :to="'/purchase/' + movie.id" style="margin-right: 5px;"><i class="fas fa-check-circle"
                        style="margin-right: 5px"></i>Buy Tickets</RouterLink>
                <p v-else class="text-center fw-bold text-danger"><i class="fas fa-ban"></i> SOLD OUT</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['movies'])
</script>

<style>
.movie-card {
    cursor: pointer;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    transition: all 0.2s ease-in-out;
}
.movie-card:hover {
    transform: scale(1.05);
    z-index: 1000;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.5);
}
</style>