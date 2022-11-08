<template>
    <div class="card shadow-4 rounded-5 mx-auto my-auto ho">
        <div class="p-5">

            <div class="heading">
                <h4 class="text-center"><b><u>Today</u></b></h4>
            </div>

            <br>
            <form>
                <div class="lastSpending">
                    <label><p><b>Last Spending: </b></p></label>
                    <input v-model="lastSpending" type="number" placeholder="$$$" />
                </div>

                <br>
                <hr>
                <br>

                <div class="category">
                    <label><p><b>Category: </b></p></label>
                    <select v-model="category">
                        <option v-for="cat of categories" :value="cat.value">
                            {{ cat.text }}
                        </option>
                    </select>
                </div>

                <br>
                <hr>
                <br>

                <div class="remainingBudget">
                    <label><p><b>Remaining Budget: </b></p></label>
                    {{ total }}
                </div>

                <br>

                <button type="button" class="btn btn-light" @click="deduct()">Add Item</button>
            </form>
            

        </div>
    </div>
</template>

<script>
import { last } from 'lodash'

    export default {
        data() {
            return {
                lastSpending: 0,
                total: 100,
                category: 'Food',
                categories: [
                    { text: 'Food', value: 'food' },
                    { text: 'Transport', value: 'transport' },
                    { text: 'Finance', value: 'finance' },
                    { text: 'Shopping', value: 'shopping' },
                    { text: 'Others', value: 'other' },
                ]
            }
        },
        computed: {
            deduct() {
                console.log("i will work on this")
                var total = this.total
                var lastSpending = this.lastSpending
                total -= lastSpending
                console.log(total)
                return total
            }
        }
    }   
</script>



