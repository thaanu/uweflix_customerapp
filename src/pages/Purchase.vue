<script setup>
import { extractUser } from '@/helpers/User.js';
import { RouterLink, useRoute } from 'vue-router';
import {getMovieSchedule, getOneMovieById} from '@/models/Movies.js';
import {getPersonalAccount} from '@/models/Accounts.js';
import SessionLayout from '@/layouts/SessionLayout.vue';
import MovieDetailedTag from '@/components/MovieDetailedTag.vue';
import Alert from '@/components/Alerts.vue';
import { onBeforeMount, ref } from 'vue';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const user = JSON.parse(localStorage.getItem('user'));
const userFromToken = extractUser();

const isClubRap = ref(userFromToken.is_club_rep);
const accountType = ref('personal'); // by default account type is 'personal'

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
        newMovie.poster_image = `${baseURL}/films/images/image/${newMovie.id}-poster.jpg`;
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

const setAccountType = (accType) => {
    accountType.value = accType;
    localStorage.setItem('account_type', accountType.value);
}

</script>

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

                <!-- Show this option for club raps only -->
                <template v-if="isClubRap">
                    <div class="mb-5">
                        <p>Select Account</p>
                        <div class="d-flex">
                            <button @click="setAccountType('personal')" style="margin-right: 10px;" :class="{'btn-primary':accountType=='personal'}" class="btn btn-lg">Personal Account</button>
                            <button @click="setAccountType('club')" style="margin-right: 10px;" :class="{'btn-primary':accountType=='club'}" class="btn btn-lg">Club Account</button>
                        </div>
                    </div>
                </template>

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