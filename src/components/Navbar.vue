<template>
    <nav>
        <ul>
            <li v-for="link in links">
                <RouterLink :to="link.href">{{ link.name }}</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const links = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/about'
    },
]
</script>