<script setup>
    import { useBillStore } from '../store/bill'
    import { UserOutlined, DeleteOutlined } from '@ant-design/icons-vue'

    const { person, index } = defineProps(['person', 'index']) 

    const { deletePerson } = useBillStore()
</script> 

<template>
    <a-avatar class="person__avatar" size="large">
        <template #icon><UserOutlined /></template>
    </a-avatar>
    <input class='person__name field' type="text" v-model="person.name">
    <button class="person__delete-btn btn btn--danger"
        @click="deletePerson(index)"
    >
        <span class="visually-hidden">Удалить человека</span>
        <delete-outlined class="person__delete-btn-icon"/>
    </button>
</template>
