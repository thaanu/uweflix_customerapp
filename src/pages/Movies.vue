<template>
    <SessionLayout>
        <!-- <div class="mb-5">
            <Carousel />
        </div> -->
        <div class="container my-5">
            <h3 class="text-center mb-5 text-uppercase">Now Showing</h3>
            <div class="row">
                <p v-if="isLoading">Loading</p>
                <MovieTag v-else :movies="movies" />
            </div>
        </div>
    </SessionLayout>
</template>

<script setup>
import {getMovies} from '@/models/Movies.js';
import SessionLayout from '@/layouts/SessionLayout.vue'
import Carousel from '@/components/Carousel.vue'
import MovieTag from '@/components/MovieTag.vue'
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const isLoading = ref(false)

const movies = ref([]);

onBeforeMount(async () => {
    isLoading.value = true
    const newMovie = await getMovies();
    const newMovies = [];
    newMovie.forEach(movie => {
        const x = movie;
        x['show_desc'] = false;
        x['rate'] = 0;
        newMovies.push(x);
    });
    movies.value = newMovies;
    console.log(movies);
    isLoading.value = false
})

</script>