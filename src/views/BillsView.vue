<script setup>
    import { useBillStore } from '../store/bill'
    import { storeToRefs } from 'pinia'
    import { CaretDownOutlined, PlusCircleOutlined, CloseSquareOutlined, UserOutlined, DeleteOutlined, WalletOutlined } from '@ant-design/icons-vue'
    import { ref } from 'vue'

    const { addProduct, deleteProduct } = useBillStore()
    const { products, people, payer, getTotalPrice } = storeToRefs(useBillStore())

    const handleCheckboxChange = (product, personName, isChecked)  => {
        if (isChecked) {
            product.whoAte.push(personName)
        } else {
            const index = product.whoAte.indexOf(personName)
            if (index !== -1) {
                product.whoAte.splice(index, 1)
            }
        }
    }

    const showDetails = (product) => {
        product.isDetailsVisible = !product.isDetailsVisible
        console.log(product.isDetailsVisible)
    }

    let isModalVisible = ref(false)
</script>
  
<template>
    <div class="wrapper">
        <div class="wrapper__header">
            <button class="wrapper__btn-add btn btn--secondary"
                type="button"
                @click="addProduct()"
            >
                <plus-circle-outlined />
                Добавить позицию
            </button>
        </div>
        
        <div class="wrapper__body bill">    
            <p class="list list--empty" v-if="products.length == 0">
                Ваша продуктовая корзина пуста 
            </p>
            <div v-else> 
                <button class="bill__payer btn btn--secondary btn--small" @click="isModalVisible = !isModalVisible">
                    <wallet-outlined />
                    Плательщик - {{ payer }}
                </button>

                <div class="modal" v-if="isModalVisible">
                    <div class="modal__wrapper">
                        <button class="modal__close-btn btn" 
                            type="button"
                            @click="isModalVisible = !isModalVisible"
                        >
                            <close-square-outlined />
                        </button>
                        <h2 class="modal__title">Изменить плательщика</h2>
                        <h3 class="modal__subtitle">Кто платил за это?</h3>
                        <label class="control control--payer" 
                            v-for="(person, personIndex) in people" 
                            :key="personIndex"
                        >
                            <a-avatar class="control__avatar control__avatar--payer" size="large">
                                <template #icon><UserOutlined /></template>
                            </a-avatar>
                            <span class="control__label control__label--payer">{{ person.name }}</span>
                            <input class="control__input control__input--payer"
                                type="radio"
                                name="bill" 
                                :id="`person-${personIndex}`" 
                                :value="person.name"
                                v-model="payer"
                            >
                            <span class="control__mark control__mark--payer"></span>
                        </label>
                    </div>
                </div>
                
                <ul class="list list--with-items">
                    <li class="list__item product"
                        v-for="(product, index) in products" :key="index" 
                    >
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
                            <caret-down-outlined class="product__details-btn-icon"
                                :class="product.isDetailsVisible ? 
                                    'product__details-btn-icon--active' :
                                    'product__details-btn-icon--inactive'"
                            />
                        </button>

                        <div v-show="product.isDetailsVisible == true" class="product__details">
                            <div class="product__people-wrapper">
                                <label class="product__person control" 
                                    v-for="(person, personIndex) in people" 
                                    :key="personIndex"
                                >
                                    <input class="control__input control__input--person"
                                        type="checkbox" 
                                        :id="`person-${personIndex}`" 
                                        :name="`bill-${index}`"
                                        :value="person.name"
                                        :checked="product.whoAte.includes(person.name)"
                                        @change="handleCheckboxChange(product, person.name, $event.target.checked)"
                                    >
                                    <span class="control__mark control__mark--person">
                                        <a-avatar class="control__avatar control__avatar--person" 
                                            :size="50"
                                        >
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
                                <delete-outlined class="person__delete-btn-icon"/>
                                Удалить позицию
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="wrapper total-price">
        <p class="total-price__description">Промежуточный итог</p>
        <p class="total-price__value">{{ getTotalPrice }} ₽</p>
    </div>

    <div class="wrapper wrapper--small">
        <router-link to="/result" class="wrapper__btn btn btn--primary">
            К результатам!
        </router-link>
    </div>
</template>
