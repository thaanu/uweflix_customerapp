<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="@/assets/logos/main-color.jpg" alt="Bootstrap" class="rounded" width="30" height="30">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li v-for="link in links" class="nav-item">
                        <RouterLink :to="link.href" class="nav-link"><i :class="link.icon" style="margin-right: 5px;"></i>{{ link.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
const links = [
    {
        name: 'Movies',
        icon: 'fas fa-video',
        href: '/movies'
    },
    {
        name: 'My Tickets',
        icon: 'fas fa-ticket',
        href: '/my-tickets'
    },
    {
        name: 'Club House',
        icon: 'fas fa-house-user',
        href: '/club-house'
    },
    {
        name: 'Signout',
        icon: 'fas fa-right-to-bracket',
        href: '/signout'
    },
]
</script>