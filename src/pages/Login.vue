<template>
    <MainLayout>
        <!-- <Carousel /> -->
        <div class="container">
            <div class="py-5 text-center">
                <div class="row">
                    <div class="offset-lg-4 col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="submitForm" method="post">
                                    <img src="@/assets/logos/main-color.jpg" class="rounded" style="width: 110px;" alt="UWEFlex Logo" />
                                    <h2 class="my-3">UWE Flex Cinema</h2>
                                    <div style="display: none;" id="login_notification" class="alert alert-danger">
                                        BAD_CODE
                                    </div>
                                    <div class="mb-3">
                                        <input type="email" v-model="formProps.user_email" class="form-control form-control-lg" id="user_email" placeholder="Email" />
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" v-model="formProps.user_pass" class="form-control form-control-lg" id="user_password" placeholder="Password" />
                                    </div>
                                    <button type="submit" name="submit" id="submit" class="btn btn-outline-success btn-lg"><i class="fas fa-check-circle"></i> Sign In</button>
                                </form>
                            </div>
                        </div>
                        <p class="mt-3">&copy; 2024</p>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import Carousel from '@/components/Carousel.vue'

import { getMe } from '@/models/Myself.js';
import { authenticate } from '@/models/Auth';

import {ref} from 'vue'
import {useRouter} from 'vue-router'

const isLoading = ref(false);
const router = useRouter();

const formProps = {
    user_email : '',
    user_pass : ''
};

async function submitForm() {
    isLoading.value = true;
    await authenticate(formProps.user_email, formProps.user_pass);
    localStorage.setItem('user', JSON.stringify(await getMe()));
    isLoading.value = false;
    await router.push({name: 'movies'});
    return false;
}

</script>