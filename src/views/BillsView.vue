<script setup>
    import AppProductField from '../components/AppProductField.vue'
    import { useBillStore } from '../store/bill'
    import { storeToRefs } from 'pinia'
    import { PlusCircleOutlined, CloseSquareOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons-vue'
    import { ref } from 'vue'

    const { addProduct } = useBillStore()
    const { products, people, payer, getTotalPrice } = storeToRefs(useBillStore())

    let isModalVisible = ref(false)
</script>
  
<template>
    <div class="wrapper">
        <div class="wrapper__header">
            <button class="wrapper__btn-add btn btn--secondary" type="button" @click="addProduct()">
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
                    Выбрать плательщика
                </button>

                <div class="modal" v-if="isModalVisible">
                    <div class="modal__wrapper">
                        <button class="modal__close-btn btn" type="button" @click="isModalVisible = !isModalVisible">
                            <span class="visually-hidden">Закрыть</span>
                            <close-square-outlined />
                        </button>
                        <h2 class="modal__title">Изменить плательщика</h2>
                        <p class="modal__subtitle">Кто платил за это?</p>
                        <label class="control control--payer" v-for="(person, personIndex) in people" :key="personIndex">
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
                    <li class="list__item product" v-for="(product, index) in products" :key="index">
                        <app-product-field :product="product" :index="index" :key="index"></app-product-field>
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
