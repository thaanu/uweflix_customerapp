<script setup >
import MainLayout from '@/layouts/MainLayout.vue'
import { onMounted } from 'vue';

onMounted(() => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_account');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_pass');
    localStorage.removeItem('seat_numbers');
    localStorage.removeItem('billing_info');
    localStorage.removeItem('account_type');
    localStorage.removeItem('schedule_id');
    localStorage.removeItem('movie_info');
    localStorage.removeItem('hall');
    localStorage.removeItem('user');
});

</script>
<template>
    <MainLayout>
        <div class="container my-5">
            <h3>Thank you for visiting UWEFlex Cinema</h3>
            <p>Now you are logged out successfully. Visit us again soon.</p>
            <RouterLink to="/" class="btn btn-outline-success">Sign In</RouterLink>
        </div>
    </MainLayout>
</template>