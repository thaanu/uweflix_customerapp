<template>
    <Navbar />
    
    <slot></slot>

    <footer>
        <hr>
        <div class="container">
            <p>&copy; 2024</p>
        </div>
    </footer>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>