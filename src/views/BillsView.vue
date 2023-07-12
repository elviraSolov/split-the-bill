<script setup>
    import { useBillStore } from '../store/bill'
    import { storeToRefs } from 'pinia'

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
</script>
  
<template>
    <div class="wrapper">
        <div class="wrapper__header">
            <button class="wrapper__btn-add btn btn--secondary"
                type="button"
                @click="addProduct()"
            >
                Добавить позицию
            </button>
        </div>
        
        <div class="wrapper__body">
            <div v-if="products.length == 0">
                <p>Ваша продуктовая корзина пуста</p>
            </div>
            <div v-else>
                <p>Кто оплачивает</p>
                <label v-for="(person, personIndex) in people" :key="personIndex">
                    <input
                        type="radio" 
                        :id="`person-${personIndex}`" 
                        name="bill"
                        :value="person.name"
                        v-model="whoPaid"
                    >
                    {{ person.name }}
                </label>
                <ul class="products-list list">
                    <li v-for="(product, index) in products" :key="index"
                        class="products-list__item product list__item"
                    >
                        <input class='product__name field' type="text" v-model="product.name">
                        <input class='product__price field' type="number" v-model="product.price">

                        <div class="details">
                            <label v-for="(person, personIndex) in people" :key="personIndex">
                                <input
                                    type="checkbox" 
                                    :id="`person-${personIndex}`" 
                                    :name="`bill-${index}`"
                                    :value="person.name"
                                    :checked="product.whoAte.includes(person.name)"
                                    @change="handleCheckboxChange(product, person.name, $event.target.checked)"
                                >
                                {{ person.name }}
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

    <div class="wrapper">
        <router-link to="/result" class="wrapper__btn-next btn btn--primary">
            К результатам!
        </router-link>
    </div>
</template>
