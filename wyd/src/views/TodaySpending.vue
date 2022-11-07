<template>
    <div class="card shadow-4 rounded-5 ho">
        <div class="p-5">

            <div class="heading">
                <h2 class="text-center"><u>Today</u></h2>
            </div>

            <br><br>

            <div class="lastSpending">
                <label><h4>Last Spending: </h4></label>
                <input v-model="lastSpending" type="number" placeholder="$$$" />
            </div>

            <br><br>
            <hr>
            <br><br>

            <div class="category">
                <label><h4>Category: </h4></label>
                <select v-model="category">
                    <option v-for="cat of categories" :value="cat.value">
                        {{ cat.text }}
                    </option>
                </select>
            </div>

            <br><br>
            <hr>
            <br><br>

            <div class="remainingBudget">
                <label><h4>Remaining Budget: </h4></label>
                {{ remainingBudget }}
            </div>

            <br><br>

            <button type="button" class="btn btn-light" @click="deduct">Add Item</button>

            

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lastSpending: 0,
                remainingBudget: 100 - this.lastSpending,
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
        method: {
            deduct() {
                console.log("i will work on this")
            }
        }
    }   
</script>

<style>
    .card {
        width: 90%;
        margin-left: 50px;
        margin-top: 100px;
        backdrop-filter: blur(1rem);
        box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);
        border-top-color: rgba(225, 225, 225, 0.5);
        border-left-color: rgba(225, 225, 225, 0.5);
        border-bottom-color: rgba(225, 225, 225, 0.1);
        border-right-color: rgba(225, 225, 225, 0.1);
    }
    .ho:hover {
        text-shadow: none !important;
        box-sizing: border-box !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        -webkit-transform: scale(1.01) !important;
        -ms-transform: scale(1.01) !important;
        transform: scale(1.01) !important;
        z-index: 2;
    }
</style>

