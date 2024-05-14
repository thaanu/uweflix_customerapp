<template>
    <MainLayout>
        <div class="container my-5">
            <h3>Thank you for visiting UWEFlex Cinema</h3>
            <p>Now you are logged out successfully. Visit us again soon.</p>
            <RouterLink to="/" class="btn btn-outline-success">Sign In</RouterLink>
        </div>
    </MainLayout>
</template>

<script setup >
import MainLayout from '@/layouts/MainLayout.vue'
import { onMounted } from 'vue';

onMounted(() => {
    localStorage.removeItem('user_token');
});

</script>