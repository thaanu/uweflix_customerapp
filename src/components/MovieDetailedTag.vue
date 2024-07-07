<template>
    <div class="row">
        <div class="col col-lg-3">
            <img v-if="!movie.poster_image" class="img-fluid" src="@/assets/dummy.jpeg" >
            <img v-else :src="movie.poster_image" class="img-fluid" :alt="movie.title">
        </div>
        <div class="col col-lg-9">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.trailer_desc }}</p>
            <p>Age rating: <b>{{ movie.age_rating }}</b></p>
        </div>
    </div>
</template>

<script setup>
defineProps(['movie']);
</script>