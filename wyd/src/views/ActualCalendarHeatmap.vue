<template>
  <!-- <svg class="chart"></svg> -->
  <calendar-heatmap
    style="font-size:8px; width:90%;"
    :values="[
      { date: '2022-10-10', count: 14 }, 
      { date: '2022-10-11', count: 78},
      { date: '2022-10-12', count: 47 },
      { date: '2022-10-13', count: 123 }, 
      { date: '2022-10-14', count: 55},
      { date: '2022-10-15', count: 35 },
      { date: '2022-10-16', count: 23 }, 
      { date: '2022-10-17', count: 155},
      { date: '2022-10-18', count: 123 },
      { date: '2022-10-19', count: 234 }, 
      { date: '2022-10-20', count: 345},
      { date: '2022-10-21', count: 15 },
      { date: '2022-10-22', count: 234 }, 
      { date: '2022-10-23', count: 33},
      { date: '2022-10-24', count: 88 },
      { date: '2022-10-25', count: 44 }, 
      { date: '2022-10-26', count: 55},
      { date: '2022-10-27', count: 66 },
      { date: '2022-10-28', count: 77 }, 
      { date: '2022-10-29', count: 77},
      { date: '2022-10-30', count: 124 },
      { date: '2022-10-31', count: 777 }, 
      { date: '2022-11-1', count: 888},
      { date: '2022-11-2', count: 33 },
      { date: '2022-11-3', count: 22 }, 
      { date: '2022-11-4', count: 44},
      { date: '2022-11-5', count: 55 },
      { date: '2022-11-6', count: 77 }, 
      { date: '2022-11-7', count: 66},
      { date: '2022-11-8', count: 99 },
      { date: '2022-11-9', count: 88 },
      { date: '2022-11-10', count: 125 }, 
      { date: '2022-11-11', count: 236},
      { date: '2022-11-12', count: 444 },
      { date: '2022-11-13', count: 77 },
      ]"
    end-date="2023-01-01"
    :round="2"
    :max="200"
    :range-color="['#77dd76', '#bde7bd', '#e7f1e8', '#ffb6b3', '#ff6962']"
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
        // var subObj = []

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
                  // subObj.push(pushobj)
                }
              }
              // console.log(this.valuesbyjames)
              // for (let [index, [key, value]] of Object.entries(Object.entries(subObj[0]))) {
              //   this.valuesbyjames.push(index)
              // }
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
