<template>
  <!-- <svg class="chart"></svg> -->
  <calendar-heatmap
    style="font-size:8px; width:90%;"
    :values="[
      { date: '2022-06-22', count: 78 }, 
      { date: '2022-06-23', count: 250},
      { date: '2022-06-24', count: 500 }]"
    end-date="2023-01-01"
    :round="2"
    :range-color="['#90EF90', '#77945C', '#ebedf0', '#B13433', '#ED2938']"
    :no-data-text="'<b>You did not spend today!</b>'"
    :tooltip-unit="'SGD Total'"
  ></calendar-heatmap>
</template>

<script>
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../main';
import { getAuth, signOut } from '@firebase/auth';
export default {
    created(){
      console.log("=====getting UID=====")
      this.uid = getAuth().currentUser.uid
      console.log(this.uid)

      console.log("=====extracting data from db=====")
      this.checkdb()
    },
    components: {
        CalendarHeatmap
    },
    props: {
      values: []
    },
    data() {
      return {
        valuesbyjames: [],
        uid: "",
        
      }
    },

    methods: {
      async checkdb(){
        console.log("calendar here")
        const docRef = doc(db, "spendings", this.uid);
        const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data())
              let daily = docSnap.data().daily
              let date = new Date
              // let month = date.getMonth()
              let year = date.getFullYear()
              
              for (let items in daily){
                if (daily[items].amt != 0){
                  let month = date.getMonth()
                  // console.log(typeof month)
                  if (month + 1 < 10){
                    var strMonth = "0" + String(month)
                  }else{
                    var strMonth = String(month + 1)
                  }
                  console.log("month is:" + strMonth)

                  let thisdate = String(year) + "-" + (strMonth) + "-" + String(items)
                  console.log("this date is:" + thisdate)
                  let pushobj = {}
                  pushobj.date = thisdate
                  console.log(thisdate)
                  pushobj.count = daily[items].amt
                  console.log(daily[items].amt)
                  this.valuesbyjames.push(pushobj)
                }
              }
              console.log(this.valuesbyjames)
              console.log("jamesvals:" + this.valuesbyjames[0])
            
          } 
      }
    }
    
};
</script>

<style>
.rect {
  fill: cornflowerblue;
}

.rect:hover {
  fill: black;
}

.axis path,
.axis line {
  fill: none;
  stroke: #fff;
}

.axis-label {
  font-weight: bold;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 20px;
  background: #7289DA;
  color: #000;
  border-radius: 5px;
}
</style>
