<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="wrapper wrapper--small">
        <h1 class="title title--main">Делим счёт</h1>
        <p>Делить счёт - просто!</p>
    </div>
    <div class="wrapper wrapper--small">
        <router-link to="/people" class="wrapper__btn btn btn--primary">
            Начать!
        </router-link>
    </div>
</template>
