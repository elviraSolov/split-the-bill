<script setup>
    import { useBillStore } from '../store/bill'
    import { storeToRefs } from 'pinia'
    import { CaretDownOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'

    const { addProduct } = useBillStore()
    const { products, people, whoPaid, getTotalPrice } = storeToRefs(useBillStore())

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
                <p>Кто платил за это?</p>
                <label class="control" 
                    v-for="(person, personIndex) in people" 
                    :key="personIndex"
                >
                    <span class="control__mark control__mark--bill"></span>
                    <input class="control__input control__input--bill"
                        type="radio"
                        name="bill" 
                        :id="`person-${personIndex}`" 
                        :value="person.name"
                        v-model="whoPaid"
                    >
                    <span class="control__label control__label--bill">{{ person.name }}</span>
                </label>
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
                            <!-- <caret-down-outlined class="product__details-btn-icon"
                                :class="{ 'product__details-btn-icon--active' : product.isDetailsVisible }"
                            /> -->
                            <caret-down-outlined 
                                :class="product.isDetailsVisible ? 
                                    'product__details-btn-icon product__details-btn-icon--active' :
                                    'product__details-btn-icon product__details-btn-icon--inactive'"
                            />
                        </button>

                        <div v-show="product.isDetailsVisible == true" class="product__details">
                            <label class="control" 
                                v-for="(person, personIndex) in people" 
                                :key="personIndex"
                            >
                                <span class="control__mark"></span>
                                <input class="control__input"
                                    type="checkbox" 
                                    :id="`person-${personIndex}`" 
                                    :name="`bill-${index}`"
                                    :value="person.name"
                                    :checked="product.whoAte.includes(person.name)"
                                    @change="handleCheckboxChange(product, person.name, $event.target.checked)"
                                >
                                <span class="control__label">{{ person.name }}</span>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="wrapper">
        <p>Промежуточный итог</p>
        <p>{{ getTotalPrice }}</p>
    </div>

    <div class="wrapper wrapper--small">
        <router-link to="/result" class="wrapper__btn btn btn--primary">
            К результатам!
        </router-link>
    </div>
</template>
