<template>
    <div class="alert" :class="alerttype">
        <i style="margin-right: 10px;" v-if="icon" :class="icon"></i>
        {{ message }}
    </div>
</template>

<script setup>
const props = defineProps(['message', 'alerttype', 'icon']);
</script>