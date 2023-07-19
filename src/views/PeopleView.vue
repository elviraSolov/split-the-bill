<script setup>
    import { RouterLink } from 'vue-router'
    import { useBillStore } from '../store/bill'
    import { UserOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons-vue'
    import { computed } from 'vue'

    const { people, addPerson, deletePerson } = useBillStore()

    let goNextButtonText = 'Дальше!'

    const isGoNextButtonDisabled = computed(() => {
        if (people.length < 2) {
            return true
        } else if (people.length >= 2 && people.some(person => person.name == undefined)) {
            return true
        } else {
            return false
        }
    })

// const isGoNextButtonDisabled = computed(() => { 
//     if (people.length < 2) {
//         goNextButtonText = 'Добавьте еще кого-нибудь!'
//         // return true
//     } else if (people.some(person => !person.name || person.name.trim() === '')) {
//         goNextButtonText = 'Стоит всем дать имена!'
//         // return true
//     } else {
//         goNextButtonText = 'Дальше!'
//         // return false
//     }
//     return people.length < 2 || people.some(person => person.name == undefined)
// })

</script> 

<template>  
    <div class="wrapper">
        <div class="wrapper__header">
            <button class="wrapper__btn-add btn btn--secondary"
                type="button"
                @click="addPerson()"
            >
                <user-add-outlined />
                Добавить человека
            </button>
        </div>
        <div class="wrapper__body">
            <p class="list list--empty" v-if="people.length == 0">
                Пока что пусто... <br>Добавим кого-нибудь!
            </p>
            <ul v-else class="list list--with-items">
                <li v-for="(person, index) in people" :key="index"
                    class="list__item person"
                >
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
                </li>
            </ul>
        </div>
    </div>
    
    <div class="wrapper wrapper--small">
        <router-link to="/bills" class="wrapper__btn btn btn--primary"
            :class="isGoNextButtonDisabled ? 'wrapper__btn--disabled' : ''"
        >
            {{ goNextButtonText }}
        </router-link>
    </div>
</template>
