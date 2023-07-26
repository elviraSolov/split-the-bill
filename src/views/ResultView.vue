<script setup>
    import AppDebt from '../components/AppDebt.vue'
    import { useBillStore } from '../store/bill'
    import { RouterLink } from 'vue-router'

    const { payer, getTotalPricePerPerson } = useBillStore()
</script>

<template>
    <div class="wrapper">
        <div class="wrapper__header">
            <h1 class="title">Результаты</h1>
        </div>
        <div class="wrapper__body">
            <app-debt 
                v-for="person in getTotalPricePerPerson" 
                v-show="person.name !== payer" 
                :person="person"
                :key="person.id"
            />
        </div>
    </div>

    <div class="wrapper wrapper--small">
        <router-link to="/" class="wrapper__btn btn btn--primary">
            Вернуться домой
        </router-link>
    </div>
</template>
