<script setup>
    import AppPersonField from '../components/AppPersonField.vue'
    import { RouterLink } from 'vue-router'
    import { useBillStore } from '../store/bill'
    import { UserAddOutlined } from '@ant-design/icons-vue'
    import { computed } from 'vue'

    const { people, addPerson } = useBillStore()

    const isGoNextButtonDisabled = computed(() => {
        return (people.length < 2) || (people.length > 1 && people.some(person => person.name == undefined)) 
    })
</script> 

<template>
    <div class="wrapper">
        <div class="wrapper__header">
            <button class="wrapper__btn-add btn btn--secondary" type="button" @click="addPerson()">
                <user-add-outlined />
                Добавить человека
            </button>
        </div>
        <div class="wrapper__body">
            <p class="list list--empty" v-if="people.length == 0">
                Пока что пусто... <br />Добавим кого-нибудь!
            </p>
            <ul v-else class="list list--with-items">
                <li class="list__item person" v-for="(person, index) in people" :key="person.id">
                    <app-person-field :person="person" :index="index" />
                </li>
            </ul>
        </div>
    </div>
    
    <div class="wrapper wrapper--small">
        <router-link to="/bills" class="wrapper__btn btn btn--primary"
            :class="isGoNextButtonDisabled ? 'wrapper__btn--disabled' : ''"
        >
            Дальше!
        </router-link>
    </div>
</template>
