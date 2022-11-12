<template>
    <div class="card shadow-4 rounded-5 mx-auto my-auto ho">
        <div class="p-3">
            <form>
                <br>
                <div class="lastSpending">
                    <label><p><b>Last Spending: </b></p></label>
                    <input v-model="last_spending" type="number" placeholder="$$$" />
                </div>

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
                    {{total}}
                </div>

                <br>

                <button type="button" class="btn btn-light" @click="deduct()">Add Item</button>
            </form>
            

        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                last_spending: 0,
                total: 100,
                category: 'Food',
                categories: [
                    { text: 'Food', value: 'food' },
                    { text: 'Transport', value: 'transport' },
                    { text: 'Finance', value: 'finance' },
                    { text: 'Entertainment', value: 'entertainment' },
                    { text: 'Others', value: 'other' },
                ],
                
            };
        },
        
        methods : {
            deduct() {
                this.total -= this.last_spending
                console.log(this.total)
                return this.total
            }
        }
        
    }   
</script>



