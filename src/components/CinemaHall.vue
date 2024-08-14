<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const emit = defineEmits(['customerSelectedSeats']);
const props = defineProps(['hall', 'bookedSeats', 'selectSeats']);
const hall = props.hall;
const bookedSeats = props.bookedSeats;

let seats = ref([]);
let noOfRows = hall.no_of_rows;
let noOfCols = hall.seats_per_row;

let _selectedSeats = [];

// Business Logics
const allowedSelectableSeats = 3;

const selectSeats = ( seatNumber ) => {
    seats.value.forEach(row => {
        row.forEach(seat => {
            if ( seat.seat_no == seatNumber) {
                
                // Remove element if already selected
                if ( seat.selected ) {
                    seat.selected = false;
                    // Remove element from array
                    _selectedSeats.splice(_selectedSeats.indexOf(seatNumber), 1);
                } 
                // Otherwise, select the element, depending on the number of available and allowed seats
                else {
                    // Apply business logic
                    if ( _selectedSeats.length >= allowedSelectableSeats ) {
                        Swal.fire({
                            title: "Hold on",
                            text: `You are eligible to select ${allowedSelectableSeats} seats`,
                            icon: "warning"
                        });
                        return false;
                    }
                    seat.selected = true;
                    _selectedSeats.push(seatNumber);
                }

                emit('customerSelectedSeats', _selectedSeats);
            }
        });
    });
}

function getButtonClasses(booked, selected) {
    if ( booked ) {
        return 'btn btn-danger';
    } else {
        if ( selected ) {
            return 'btn btn-primary';
        } else {
            return 'btn btn-outline-primary';
        }
    }
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

for ( let r = 0; r < noOfRows; r++ ) {
    let cols = [];
    for ( let c = 1; c <= noOfCols; c++ ) {

        let seatId = `${letters[r]}#${c}`;
        let seatIdUnhashed = `${letters[r]}${c}`;
        let isBooked = false;

        if ( bookedSeats.length > 0 && bookedSeats.includes(seatIdUnhashed) ) {
            isBooked = true;
        }

        cols.push({
            "seat_no":letters[r] + c,
            "seat_id": seatId,
            "booked": isBooked,
            "selected": false
        })
    }
    seats.value.push(cols);
    
}

</script>

<template>
    <div class="screen">SCREEN</div>
    <div class="seat_row" v-for="rows in seats">
        <button @click="selectSeats(seat.seat_no)" v-for="seat in rows" type="button" :disabled="seat.booked" :class="getButtonClasses(seat.booked, seat.selected)" class="btn">
            {{ seat.seat_no }}
        </button>
    </div>
    <p class="mt-5 text-center"><span class="text-danger">Red Color</span> seats are already booked</p>
</template>

<style>
.screen {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #999;
    text-align: center;
    margin-bottom: 20px;
}

.seat_row {
    display: flex;
    justify-content: center;
    margin-bottom: 2px;
}

.seat_row .btn {
    width: 100px;
    margin: 0 2px;
}
</style>