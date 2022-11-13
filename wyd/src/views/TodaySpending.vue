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
                    ${{total}}
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
                date: new Date,
                uid: "",
                last_spending: 0,
                total: 100,
                daily: {},
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
                    let day = this.date
                    let num = day.getDate()
                    this.last_spending = docSnap.data().lastSpending
                    this.daily = docSnap.data().daily
                    this.total = (docSnap.data().total/30 - this.daily[num].amt).toFixed(2)


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    setDoc(docRef, {total: 1000, lastSpending: 0, daily: {1:{amt: 0, cat: {}},2:{amt: 0, cat: {}},3:{amt: 0, cat: {}},4:{amt: 0, cat: {}},5:{amt: 0, cat: {}},6:{amt: 0, cat: {}},7:{amt: 0, cat: {}},8:{amt: 0, cat: {}},9:{amt: 0, cat: {}},10:{amt: 0, cat: {}},11:{amt: 0, cat: {}},12:{amt: 0, cat: {}},13:{amt: 0, cat: {}},14:{amt: 0, cat: {}},15:{amt: 0, cat: {}},16:{amt: 0, cat: {}},17:{amt: 0, cat: {}},18:{amt: 0, cat: {}},19:{amt: 0, cat: {}},20:{amt: 0, cat: {}},21:{amt: 0, cat: {}},22:{amt: 0, cat: {}},23:{amt: 0, cat: {}},24:{amt: 0, cat: {}},25:{amt: 0, cat: {}},26:{amt: 0, cat: {}},27:{amt: 0, cat: {}},28:{amt: 0, cat: {}},29:{amt: 0, cat: {}},30:{amt: 0, cat: {}},31:{amt: 0, cat: {}}} } );
                }
            },

            async updatedb(){
                const docRef = doc(db, "spendings", this.uid);
                let day = this.date
                let num = day.getDate()
                this.daily[num].amt += this.last_spending
                console.log("dailydaily:" + this.daily[num].amt)
                if (this.daily[num].cat[this.category] == undefined){
                    this.daily[num].cat[this.category] = this.last_spending
                }else{
                    this.daily[num].cat[this.category] += this.last_spending
                }
                await updateDoc(docRef, { lastSpending: this.last_spending, daily: this.daily})
            },
            deduct() {
                if (this.last_spending > this.total) {
                    alert("You are out of budget!")
                    this.$swal({
                        title:"You're out of money!",
                        text: 'Have you been spending too much?', 
                        animation: false,
                        customClass: {
                            icon: 'no-border',
                            },
                        showConfirmButton: true,
                        background: 'rgba( 230, 232, 255, 0.8 )',
                        backdrop: `blur( 9px )`,
                        confirmButtonColor: '#5E6EE6',
                        color: '#4955b3'
                        }
                        )
                } else {
                    this.total -= this.last_spending.toFixed(2)
                    console.log(this.total)
                    this.updatedb()
                    return this.total
                }
  }
        }
        
    }   
</script>



