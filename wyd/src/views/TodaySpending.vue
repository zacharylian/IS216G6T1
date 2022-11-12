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
import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../main';
import { getAuth, signOut } from '@firebase/auth';
// import {getDate}

    export default {
        created(){
            console.log("=====getting UID=====")
            this.uid = getAuth().currentUser.uid
            console.log(this.uid)

            console.log("=====extracting data from db=====")
            this.checkdb()
        },
        data() {
            return {
                date: getDate(new Date),
                uid: "",
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
            async checkdb(){
                const docRef = doc(db, "spendings", this.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data())
                    this.last_spending = docSnap.data().lastSpending
                    this.total = docSnap.data().total/30 - docSnap.data().daily[this.date].amt


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    setDoc(docRef, {total: 1000, lastSpending: 0, daily: {1:{amt: 0},2:{amt: 0},3:{amt: 0},4:{amt: 0},5:{amt: 0},6:{amt: 0},7:{amt: 0},8:{amt: 0},9:{amt: 0},10:{amt: 0},11:{amt: 0},12:{amt: 0},13:{amt: 0},14:{amt: 0},15:{amt: 0},16:{amt: 0},17:{amt: 0},18:{amt: 0},19:{amt: 0},20:{amt: 0},21:{amt: 0},22:{amt: 0},23:{amt: 0},24:{amt: 0},25:{amt: 0},26:{amt: 0},27:{amt: 0},28:{amt: 0},29:{amt: 0},30:{amt: 0},31:{amt: 0}} } );
                }
            },

            async updatedb(){
                const docRef = doc(db, "spendings", this.uid);
                await updateDoc(docRef, { total: this.total, lastSpending: this.last_spending })
            },

            deduct() {
                this.total -= this.last_spending
                console.log(this.total)
                this.updatedb()
                return this.total
            }
        }
        
    }   
</script>



