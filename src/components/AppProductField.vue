<script setup>
    import { defineProps } from 'vue'
    import { useBillStore } from '../store/bill'
    import { storeToRefs } from 'pinia'
    import { CaretDownOutlined, UserOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons-vue'

    const { product, index } = defineProps(['product', 'index'])

    const { deleteProduct } = useBillStore()
    const { people } = storeToRefs(useBillStore())

    const handleCheckboxChange = (product, personName, isChecked) => {
        if (isChecked) {
            product.whoAte.push(personName)
        } else {
            const index = product.whoAte.indexOf(personName)
            if (index !== -1) {
                product.whoAte.splice(index, 1)
            }
        }
    }

    const handleCheckboxAllChange = (product, isChecked) => {
        if (isChecked) {
            people.value.forEach((person) => {
                if (!product.whoAte.includes(person.name)) {
                    product.whoAte.push(person.name)
                }
            })
        } else {
            people.value.forEach((person) => {
                product.whoAte.splice(person, 1)
            })
        }   
    }

    const showDetails = (product) => {
        product.isDetailsVisible = !product.isDetailsVisible
        console.log(product.isDetailsVisible)
    }
</script>
  
<template>
    <input class='product__name field' 
        placeholder="Название"
        type="text" 
        v-model="product.name"
    >
    <input class='product__price field' 
        placeholder="Цена"
        type="number" 
        v-model="product.price"
    >

    <button class="product__details-btn btn" 
        type="button" 
        @click="showDetails(product)"
    >
        <span class="visually-hidden">Подробнее о позиции</span>
        <caret-down-outlined class="product__details-btn-icon"
            :class="product.isDetailsVisible ? 
                'product__details-btn-icon--active' :
                'product__details-btn-icon--inactive'"
        />
    </button>

    <div v-show="product.isDetailsVisible == true" class="product__details">
        <div class="product__people-wrapper">
            <label class="product__person control" 
            >
                <input class="control__input control__input--person" 
                    type="checkbox"
                    @change="handleCheckboxAllChange(product, $event.target.checked)"
                >
                <span class="control__mark control__mark--person">
                    <a-avatar class="control__avatar control__avatar--person" :size="50">
                        <template #icon><TeamOutlined /></template>
                    </a-avatar>
                    <span class="control__label control__label--person">
                        Все 
                    </span>
                </span>
            </label>

            <label class="product__person control" 
                v-for="(person) in people" 
                :key="person.id"
            >
                <input class="control__input control__input--person"
                    type="checkbox" 
                    :id="`person-${person.id}`" 
                    :name="`bill-${index}`"
                    :value="person.name"
                    :checked="product.whoAte.includes(person.name)"
                    @change="handleCheckboxChange(product, person.name, $event.target.checked)"
                >
                <span class="control__mark control__mark--person">
                    <a-avatar class="control__avatar control__avatar--person" :size="50">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <span class="control__label control__label--person">
                        {{ person.name }}
                    </span>
                </span>
            </label>
        </div>
        <button class="btn btn--small btn--danger" 
            type="button"
            @click="deleteProduct(index)"
        >
            Удалить позицию
            <delete-outlined class="person__delete-btn-icon"/>
        </button>
    </div>
</template>
