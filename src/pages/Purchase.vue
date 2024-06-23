<template>
    <SessionLayout>
        <div class="container my-5">
            <h3 class="text-center mb-5 text-uppercase">Purchase Ticket</h3>
            <div class="row">
                <Alert v-if="serverError" :message="serverError" alerttype="alert-danger" icon="fas fa-circle-exclamation" />
                <p v-if="isLoading">Loading</p>
                <MovieTag v-else :movies="movies" />
            </div>
        </div>
    </SessionLayout>
</template>

<script setup>

import {getOneMovieById} from '@/models/Movies.js';
import SessionLayout from '@/layouts/SessionLayout.vue'
import MovieTag from '@/components/MovieTag.vue'
import Alert from '@/components/Alerts.vue';
import { onBeforeMount, ref } from 'vue';

let selectedMovieId = 1;

const serverError = ref(undefined)
const isLoading = ref(false)

const movies = ref([]);

onBeforeMount( async () => {
    isLoading.value = true;

    try {
        const newMovie = await getOneMovieById(selectedMovieId);
        const newMovies = [];
        newMovie.forEach(movie => {
            console.log(movie);
            const x = movie;
            x['show_desc'] = false;
            x['rate'] = 0;
            newMovies.push(x);
        });
        movies.value = newMovies;
    }
    catch ( err ) {
        serverError.value = err.message;
    }

    isLoading.value = false
} );

</script>