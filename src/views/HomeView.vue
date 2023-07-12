<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="wrapper wrapper--small">
        <h1 class="title">Делим счёт</h1>
        <p class="subtitle">Делить счёт - просто!</p>
    </div>
    <div class="wrapper wrapper--small">
        <router-link to="/people" class="btn btn--primary">
            Начать!
        </router-link>
    </div>
</template>
