import { defineStore } from 'pinia'

export const useBillStore = defineStore('bill', {
    state: () => ({
        people: [],
        payer: '',
        products: []
    }),
    getters: {
        getTotalPrice() {
            return this.products.reduce((total, product) => {
              if (!isNaN(product.price) && product.price !== null && product.price !== '') {
                total += product.price
              }
              return total
            }, 0)
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
            const product = { name: null, price: null, whoAte: [], id: Date.now() }
            this.products.push(product)
        },
        deleteProduct(index) {
            this.products.splice(index, 1)
        },
        addPerson() {
            const person = { name: null, debt: 0, id: Date.now() }
            this.people.push(person)
        },
        deletePerson(index) {
            this.people.splice(index, 1)
        }
    },
})