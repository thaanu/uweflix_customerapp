<template>
    <SessionLayout>
        <div class="container my-5">
            <h3 class="text-center mb-5 text-uppercase">Purchase Ticket</h3>
            <div class="row">
                <Alert v-if="serverError" :message="serverError" alerttype="alert-danger" icon="fas fa-circle-exclamation" />
                <p v-if="isLoading"><i class="fas fa-spin fa-spinner"></i> Loading Movie Information</p>
                <div class="mb-5">
                    <MovieDetailedTag :movie="movie" />
                </div>

                <p v-if="isScheduleLoading"><i class="fas fa-spin fa-spinner"></i> Loading Available Schedule</p>
                <div v-if="!isScheduleLoading">
                    <p>Select a show</p>
                    <p v-if="schedules.length == 0" class="alert alert-info"><i class="fas fa-ticket" style="margin-right: 10px"></i>No schedule available</p>
                    <div style="display: flex; flex-flow: wrap; gap: 10px;">
                        <RouterLink v-for="schedule in schedules" :to="'/purchase/seats/'+schedule.film_id+'/'+schedule.hall_id+'/'+schedule.id" class="btn btn-outline-primary btn-lg" style="width: 180px;">{{ schedule.formatted_showtime }}</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </SessionLayout>
</template>

<script setup>

import { RouterLink, useRoute } from 'vue-router';
import {getMovieSchedule, getOneMovieById} from '@/models/Movies.js';
import SessionLayout from '@/layouts/SessionLayout.vue';
import MovieDetailedTag from '@/components/MovieDetailedTag.vue';
import Alert from '@/components/Alerts.vue';
import { onBeforeMount, ref } from 'vue';

const route = useRoute();

let selectedMovieId = route.params.movieid;

const serverError = ref(undefined)
const isLoading = ref(false)
const isScheduleLoading = ref(false)

const movie = ref([]);

const schedules = ref([]);

onBeforeMount( async () => {
    isLoading.value = true;
    isScheduleLoading.value = true;

    // Get movie information
    try {
        const newMovie = await getOneMovieById(selectedMovieId);
        movie.value = newMovie;
    }
    catch ( err ) {
        serverError.value = 'Unable to fetch movie information';
    }

    // Movie schedule
    try {
        const movieSchedules = await getMovieSchedule(selectedMovieId);
        const xyzSchedule = [];
        if ( movieSchedules.length ) {
            movieSchedules.forEach(schedule => {
                let x = schedule;
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                let showTime = new Date(schedule.show_time);
                x['formatted_showtime'] = months[showTime.getMonth()] + " " + showTime.getDate() + " at " + showTime.getHours() +":"+ showTime.getMinutes().toString().padStart(2, '0');;
                xyzSchedule.push(x)
            });
        }
        schedules.value = xyzSchedule;

    }
    catch(err) {
        serverError.value = err.message;
    }

    isScheduleLoading.value = false
    isLoading.value = false
} );

</script>