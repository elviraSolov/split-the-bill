<script setup>
    import { RouterLink } from 'vue-router'
    import { useBillStore } from '../store/bill'

    const { people, addPerson } = useBillStore()
</script> 

<template>  
    <div class="wrapper">
        <div class="wrapper__header">
            <button class="wrapper__btn-add btn btn--secondary"
                type="button"
                @click="addPerson()"
            >
                Добавить человека
            </button>
        </div>
        
        <div class="wrapper__body">
            <div v-if="people.length == 0">
                <p>Пока что пусто</p>
                <p>Добавим кого-нибудь!</p>
            </div>
            <ul v-else class="people-list list">
                <li v-for="(person, index) in people" :key="index"
                    class="list__item people-list__item person"
                >
                    <input class='person__name field' type="text" v-model="person.name">
                </li>
            </ul>
        </div>

    </div>

    <div class="wrapper">
        <router-link to="/bills" class="wrapper__btn-next btn btn--primary">
            Дальше!
        </router-link>
    </div>
</template>
