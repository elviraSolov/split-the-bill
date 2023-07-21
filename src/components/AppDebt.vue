<script setup>
    import { useBillStore } from '../store/bill'
    import { defineProps } from 'vue'

    const { person } = defineProps(['person'])

    const { payer } = useBillStore()
</script>

<template>
    <div class="debt">
        <p class="debt__text">
            Пользователь 
            <span class="debt__name">{{ person.name }}</span> 
            должен {{ payer }}
            <span class="debt__value">{{ person.debt }} ₽</span>
        </p>
    </div>
</template>
