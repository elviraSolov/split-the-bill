import { defineStore } from 'pinia'

export const useBillStore = defineStore('bill', {
    state: () => ({
        people: [],
        payer: '',
        products: []
    }),
    getters: {
        getTotalPrice() {
            let total = 0
            for (let product of this.products) {
                // Проверка на пустую строку (иначе к началу суммы прибавляется 0)
                const price = parseFloat(product.price)
                if (!isNaN(price) && price!==null && price !=='') {
                    total += price
                }
            }
            return total 
        },
        getTotalPricePerPerson() {
            for (let person of this.people) {
                person.debt = 0
            }

            for (let product of this.products) {
                const pricePerPerson = product.price / product.whoAte.length
                for (let personName of product.whoAte) {
                    if (personName !== this.payer) {
                        const person = this.people.find(p => p.name === personName)
                        person.debt += pricePerPerson
                    }   
                }
            }
        
            return this.people
        }
    },
    actions: {
        addProduct() {
            const product = { name: null, price: null, whoAte: [] }
            this.products.push(product)
        },
        deleteProduct(index) {
            this.products.splice(index, 1)
        },
        addPerson() {
            const person = { name: null, debt: 0 }
            this.people.push(person)
        },
        deletePerson(index) {
            this.people.splice(index, 1)
        }
    },
})