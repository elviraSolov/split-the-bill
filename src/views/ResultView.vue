<script setup>
    import { useBillStore } from '../store/bill'

    const {  whoPaid, getTotalPricePerPerson } = useBillStore()

    console.log(getTotalPricePerPerson)
</script>

<template>
    <div class="wrapper">
        <div v-for="person in getTotalPricePerPerson">
            <p v-if="person.name == whoPaid"></p>
            <p v-else>
                {{ person.name }} должен {{ whoPaid }} {{ person.debt }} рублей
            </p>
        </div>
    </div>
</template>
