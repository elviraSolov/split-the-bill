<script setup>
    import { useBillStore } from '../store/bill'
    import { RouterLink } from 'vue-router'

    const { payer, getTotalPricePerPerson } = useBillStore()

    console.log(getTotalPricePerPerson)
</script>

<template>
    <div class="wrapper">
        <div class="wrapper__header">
            <h1 class="title">Результаты</h1>
        </div>
        <div v-for="person in getTotalPricePerPerson">
            <p v-if="person.name == payer"></p>
            <p v-else>
                {{ person.name }} должен {{ payer }} {{ person.debt }} рублей
            </p>
        </div>
    </div>

    <div class="wrapper wrapper--small">
        <router-link to="/" class="wrapper__btn btn btn--primary"
        >
            Вернуться домой
        </router-link>
    </div>
</template>
