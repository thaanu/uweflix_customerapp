<template>
    <SessionLayout>
        <!-- <div class="mb-5">
            <Carousel />
        </div> -->
        <div class="container my-5">
            <h3 class="text-center mb-5 text-uppercase">Now Showing</h3>
            <div class="row">
                <p v-if="isLoading">Loading</p>
                <MovieTag v-if="!isLoading" :movies="movies" />
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

const movies = ref([
    {
        uid: 111,
        image: 'https://poster.gsc.com.my/2024/240429_RerunStarWarsEpisodeI-ThePhantomMenace_big.jpg',
        name: 'Starwars: Episode 1',
        rate: 9.5,
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laboriosam, ab, alias voluptate doloremque dolor officia ipsa distinctio dolorum provident adipisci minus officiis nesciunt rem fuga quam? Nulla, unde tempora!`,
        available: true,
        show_desc: false
    },
    {
        uid: 112,
        image: 'https://poster.gsc.com.my/2024/240324_TheRoundupPunishment_big.jpg',
        name: 'The Roundup: Punishment',
        rate: 5,
        desc: `While investigating a drug-trafficking app, “Monster Cop” Ma Seok Do and his team discover a connection between the app’s developer, who was murdered in the Philippines, and an illegal online gambling organization. Meanwhile, in the Philippines, Baek Chang Ki is controlling the Korean online illegal gambling market and spreading terror with kidnap, assault and murder. His partner, the IT genius Jang Dong Cheol, is planning an even larger scheme in Korea itself. To put an end to the escalating threat, Detective Ma expands his operation by proposing an unexpected alliance… The fourth installment in the Roundup series.`,
        available: true,
        show_desc: false
    },
    {
        uid: 113,
        image: 'https://poster.gsc.com.my/2023/231205_KingdomOfThePlanetOfTheApes_big.jpg',
        name: 'Kingdom Of The Planet Of The Apes',
        rate: 7.5,
        desc: `Many ape clans have emerged in the oasis where Caesar led his fellow apes to, while humans have regressed into a feral state. One ape leader perverts the teachings of Caesar to enslave other clans in search of the last traces of a secret human technology, while another ape embarks on a journey to find freedom side by side with a human girl.`,
        available: true,
        show_desc: false
    },
    {
        uid: 114,
        image: 'https://poster.gsc.com.my/2023/231213_KungFuPanda4_big.jpg',
        name: 'Kung Fu Panda 4',
        rate: 6.5,
        desc: 'The Dragon Warrior is back, and he\'s about to embark to face the most threatening enemy he\'s ever had to battle. Po leaves the Valley of Peace to go to the big city, where the unexpected personification of evil will already be waiting for him. A new villain, called The Chameleon, is in town, and the Dragon Warrior\'s new adversary is not someone he can mess around with.',
        available: true,
        show_desc: false
    },
    {
        uid: 114,
        image: 'https://poster.gsc.com.my/2023/231205_GhostbustersFrozenEmpire_big.jpg',
        name: 'Ghostbusters: Frozen Empire',
        rate: 6.5,
        desc: 'The Spengler family returns to where it all started - the iconic New York City firehouse - to team up with the original Ghostbusters, who\'ve developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age',
        available: true,
        show_desc: false
    }
]);

onBeforeMount(async () => {
    isLoading.value = true
    const newMovie = await getMovies()
    movies.value.push(newMovie);
    isLoading.value = false
})

</script>