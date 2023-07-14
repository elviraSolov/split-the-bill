<script setup>
    import { RouterLink } from 'vue-router'
    import { useBillStore } from '../store/bill'
    import { UserOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons-vue'

    const { people, addPerson, deletePerson } = useBillStore()
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
                    <button class="person__delete-btn btn"
                        @click="deletePerson(index)"
                    >
                        <delete-outlined class="person__delete-btn-icon"/>
                    </button>
                </li>
            </ul>
        </div>
    </div>

    <div class="wrapper wrapper--small">
        <router-link to="/bills" class="wrapper__btn btn btn--primary">
            Дальше!
        </router-link>
    </div>
</template>
