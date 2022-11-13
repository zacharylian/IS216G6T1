<template>

<!-- <body> -->
  <navbar style="z-index:5"></navbar>
  <body>
    <div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  </body>

<main>
  <div :style='adjustible'>  

  <div class="pt-3 m-auto" style="width:90vw;height:100%">

<div class="row" >
  <div class="col col col-xxl-7 col-xl-7 ">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col mt-2">
            <!--NAME-->
            <h1 class="px-3 py-1" style="text-align:left;font-style:italic;height:5vw;color:whitesmoke">hi, <b style="">{{this.username}}!</b></h1>
          </div></div>
          <div class="row">
            <div class="col wanbottom bgbox pb-4" style="height:340px;overflow:auto;">
            <!--UPCOMING EVENTS-->
            <h3 class="py-2" style="font-style:normal;">upcoming events</h3>
            <div class="d-flex justify-content-center align-items-center " style="margin:auto;z-index:-1">
              <div class="card m-2 " style="width: 500px;height:110px;border-radius:20px;border:none;" v-for="event in apptdata1">
                <div class="card-body bgbog " style="box-shadow:none;border-radius:20px">
                  <h5 class="card-title  " style="font-weight:bold;color:#E6E8FF">{{event.Subject}}</h5>
                  <h6 class="card-subtitle m-auto d-flex justify-content-center align-items-center" style="color:#E6E8FF">{{event.StartTime}}</h6>
                </div>    
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center" style="margin:auto;z-index:-1">
              <div class="card m-2" style="width: 500px;height:110px;border-radius:20px;border:none;" v-for="event in apptdata2">
                <div class="card-body bgbog" style="box-shadow:none;border-radius:20px">
                  <h5 class="card-title" style="font-weight:bold;color:#E6E8FF">{{event.Subject}}</h5>
                  <h6 class="card-subtitle m-auto d-flex justify-content-center align-items-center" style="color:#E6E8FF">{{event.StartTime}}</h6>
                </div>    
              </div>
            </div>
          </div>
          </div>
          <div class="row wanbottom">
            <div class="col py-2 bgbox wanright wanbottom" style="height:230px">
              <!--EXPENSES-->
              <h3 style="font-style:normal">expenses</h3><br><br>
                <h3>
              <div :style='highlighter'>
              <span style="font-size:2.5vw">
              ${{  this.spent }}/${{  this.remainingBudget   }}</span></div></h3>

              </div>

              <div class="col py-2 bgbox wanright wanbottom" style="height:230px">
              <!--FOCUS TIME TODAY-->
              <h3 style="font-style:normal">your focus today</h3>
              <div>
                <div class="skill">
                  <div class="outer bgbox">
                      <div class="inner">
                          <div id="number">
                              {{this.percentagedone.toFixed(2)}}%
                          </div>
                      </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px" class="mysvg">
                      <defs>
                          <linearGradient id="GradientColor">
                            <stop offset="0%" stop-color="#5E6EE6" />
                            <stop offset="100%" stop-color="#2A3166" />
                          </linearGradient>
                      </defs>
                      <circle cx="80" cy="80" r="70" stroke-linecap="round" :style='cssVars'/>
                  </svg>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col col-xxl-5 col-xl-5 col-lg-12 col-md-12 bgbox px-5" style="overflow:auto;border-radius:20px;height:650px;width:500px;margin:auto;">
          <h3 class="p-2" style="font-style:normal">to-do list</h3>
          <todo></todo>          
        </div>
      </div>
</div>
</div>
</main>
<!--</body> -->

</template>


<script>
// @ is an alias to /src
// import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';
// import navBar from '@/components/layouts/navbar.vue';

import todo from '@/components/layouts/todo.vue';
import { getAuth, signOut } from '@firebase/auth';
import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../main';
import {appointmentData} from '@/data.js';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-treegrid';
import navbar from '@/components/layouts/new_navbar.vue';

export default {
  name: 'HomeView',
  created(){
    console.log("=====getting UID=====")
        this.uid = getAuth().currentUser.uid
        console.log(this.uid)

        console.log("=====extracting data from db=====")
        this.checkdb()
        this.percentagedone = this.totalduration/(Number(this.goalhours)*60)*100
        console.log(this.percentagedone)
  },
  components: {
    "todo": todo,
    "navbar" : navbar,
    'ejs-treegrid' : TreeGridComponent,
    'e-columns' : ColumnsDirective,
    'e-column' : ColumnDirective


  },

  data() {return {
    apptdata1: [],
    apptdata2: [],
    username: getAuth().currentUser.displayName,
    date: new Date(),
    percentagedone: 0,
    uid: "",
    goalhours: 0,
    totalduration: 0,
    windowWidth: window.innerWidth,
    remainingBudget: 0,
    spent: 0,
    
  }},

  computed: {
    cssVars() {
      return {
        '--numbers': 472 - (472 * this.percentagedone/100)
      }
    },

    adjustible() {
      console.log(this.windowWidth)
      if (this.windowWidth < 768 ){
        console.log('runs 0')
      return {
        '--marg-left': '0rem'
      }}
      else {
        console.log('runs 6')
        return {
          '--marg-left': '6rem'
        }
      }
    },
    highlighter(){
      let valuee=this.spent/this.remainingBudget;
      if (valuee>1) {
        return {
        '--background-color' : 'RGBA(255,143,150,0.24)'
      }
      }
      else {
        return {
        '--background-color' : 'RGBA(61,255,150,0.24)'
      }
      }
    }
  }
  ,

  mounted: function(){
    this.spendingtime()
  },

  methods: {
    async checkdb(){
            const docRef = doc(db, "focustimer", this.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            this.goalhours = docSnap.data().goalhours
            this.totalduration = docSnap.data().totalduration
            this.percentagedone = this.totalduration/(this.goalhours*60)*100
            if (isNaN(this.percentagedone)) {
              this.percentagedone=0
              //set focus circle here also
            }
            console.log(this.percentagedone)
            

            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("=====creating focustimer document=====")
            setDoc(docRef, {goalhours: this.goalhours, totalduration: 0 });
            }

            const docRef2 = doc(db, "calendar", this.uid);
            const docSnap2 = await getDoc(docRef2);
            if (docSnap2.exists()) {
            console.log("Document data:", docSnap2.data());
            console.log("Events: ", docSnap2.data().appointmentData)
            // let first_event = docSnap2.data().appointmentData[0]
            let upcoming = new Date(2100, 12)
            console.log(upcoming)
            let earliest_event = ""
            for (var info of docSnap2.data().appointmentData){
              let today = new Date
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime > today && info.StartTime<=upcoming){
                console.log("starttime:" + info.StartTime)
                upcoming = info.StartTime              
              }
            }
            console.log("updated upcoming", upcoming)
            for (var info of docSnap2.data().appointmentData){
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              // console.log(info.StartTime)
              if (info.StartTime.toDateString() === upcoming.toDateString()){
                console.log("starttime:" + info.StartTime)
                let year = info.StartTime.getFullYear()
                let month = info.StartTime.getMonth() + 1
                let day = info.StartTime.getDate()
                let time = info.StartTime.toLocaleTimeString('en-US')
                info.StartTime = day + "/" + month + "/" + year + " " + time
                info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
                year = info.EndTime.getFullYear()
                month = info.EndTime.getMonth()
                day = info.EndTime.getDate()
                info.EndTime = day + "/" + month + "/" + year
                earliest_event = info   
                if (this.apptdata1.length<2) {
                  this.apptdata1.push(earliest_event) 
                } else if (this.apptdata2.length<2) {
                  this.apptdata2.push(earliest_event)
                }
              }
            }    
            
            let second_event = ""
            let upcoming2 = new Date(2100, 12)
            for (var info of docSnap2.data().appointmentData){
              let today = new Date
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime > today && info.StartTime<=upcoming2 && info.StartTime.toDateString()!=upcoming.toDateString()){
                console.log("starttime:" + info.StartTime)
                upcoming2 = info.StartTime 
              }
            }
            console.log("updated upcoming2", upcoming2)
            for (var info of docSnap2.data().appointmentData){
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime.toDateString() === upcoming2.toDateString()){
                console.log("starttime:" + info.StartTime)
                let year = info.StartTime.getFullYear()
                let month = info.StartTime.getMonth() + 1
                let day = info.StartTime.getDate()
                let time = info.StartTime.toLocaleTimeString('en-US')
                info.StartTime = day + "/" + month + "/" + year + " " + time
                info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
                year = info.EndTime.getFullYear()
                month = info.EndTime.getMonth()
                day = info.EndTime.getDate()
                info.EndTime = day + "/" + month + "/" + year
                second_event = info        
                if (this.apptdata1.length<2) {
                  this.apptdata1.push(second_event) 
                } else if (this.apptdata2.length<2) {
                  this.apptdata2.push(second_event)
                }
              }
            } 
      
            let third_event = ""
            let upcoming3 = new Date(2100, 12)
            for (var info of docSnap2.data().appointmentData){
              let today = new Date
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime > today && info.StartTime<=upcoming3 && info.StartTime.toDateString()!=upcoming.toDateString() && info.StartTime.toDateString()!=upcoming2.toDateString()){
                console.log("starttime:" + info.StartTime)
                upcoming3 = info.StartTime 
              }
            }
            console.log("updated upcoming3", upcoming3)
            for (var info of docSnap2.data().appointmentData){
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime.toDateString() === upcoming3.toDateString()){
                console.log("starttime:" + info.StartTime)
                let year = info.StartTime.getFullYear()
                let month = info.StartTime.getMonth() + 1
                let day = info.StartTime.getDate()
                let time = info.StartTime.toLocaleTimeString('en-US')
                info.StartTime = day + "/" + month + "/" + year + " " + time
                info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
                year = info.EndTime.getFullYear()
                month = info.EndTime.getMonth()
                day = info.EndTime.getDate()
                info.EndTime = day + "/" + month + "/" + year
                third_event = info        
                if (this.apptdata1.length<2) {
                  this.apptdata1.push(third_event) 
                } else if (this.apptdata2.length<2) {
                  this.apptdata2.push(third_event)
                }
              }
            }

            let fourth_event = ""
            let upcoming4 = new Date(2100, 12)
            for (var info of docSnap2.data().appointmentData){
              let today = new Date
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime>today && info.StartTime<=upcoming4 && info.StartTime.toDateString()!=upcoming.toDateString() && info.StartTime.toDateString()!=upcoming2.toDateString() && info.StartTime.toDateString()!=upcoming3.toDateString()){
                console.log("starttime:" + info.StartTime)
                upcoming4 = info.StartTime 
              }
            }
            console.log("updated upcoming4", upcoming4)
            for (var info of docSnap2.data().appointmentData){
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              if (info.StartTime.toDateString() === upcoming4.toDateString()){
                console.log("starttime:" + info.StartTime)
                let year = info.StartTime.getFullYear()
                let month = info.StartTime.getMonth() + 1
                let day = info.StartTime.getDate()
                let time = info.StartTime.toLocaleTimeString('en-US')
                info.StartTime = day + "/" + month + "/" + year + " " + time
                info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
                year = info.EndTime.getFullYear()
                month = info.EndTime.getMonth()
                day = info.EndTime.getDate()
                info.EndTime = day + "/" + month + "/" + year
                fourth_event = info        
                if (this.apptdata1.length<2) {
                  this.apptdata1.push(fourth_event) 
                } else if (this.apptdata2.length<2) {
                  this.apptdata2.push(fourth_event)
                }
              }
            }
            
          
            console.log(this.apptdata1)
            console.log(this.apptdata2)
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("=====creating calendar document=====")
            setDoc(docRef2, { treeviewData: [], appointmentData: [{
                Id : 1,
                Subject : 'Learn Thai',
                StartTime: new Date(2022, 10, 5, 8, 0, 0),
                EndTime: new Date(2022, 10, 6, 9, 0, 0),
                PriorityId : 1,
            },], currId: 0, id: 'Id', text: 'Name'});
            }

            const docRef3 = doc(db, "spendings", this.uid);
            const docSnap3 = await getDoc(docRef3);

            if (docSnap3.exists()) {
            console.log("Document data:", docSnap3.data());
            let day = new Date
            let num = day.getDate()
            this.spent = docSnap3.data().daily[num].amt
            this.remainingBudget = (docSnap3.data().total / 30).toFixed(2)
            

            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("=====creating focustimer document=====")
            setDoc(docRef3, { total: 1000, lastSpending: 0, daily: {1:{amt: 0, cat: {}},2:{amt: 0, cat: {}},3:{amt: 0, cat: {}},4:{amt: 0, cat: {}},5:{amt: 0, cat: {}},6:{amt: 0, cat: {}},7:{amt: 0, cat: {}},8:{amt: 0, cat: {}},9:{amt: 0, cat: {}},10:{amt: 0, cat: {}},11:{amt: 0, cat: {}},12:{amt: 0, cat: {}},13:{amt: 0, cat: {}},14:{amt: 0, cat: {}},15:{amt: 0, cat: {}},16:{amt: 0, cat: {}},17:{amt: 0, cat: {}},18:{amt: 0, cat: {}},19:{amt: 0, cat: {}},20:{amt: 0, cat: {}},21:{amt: 0, cat: {}},22:{amt: 0, cat: {}},23:{amt: 0, cat: {}},24:{amt: 0, cat: {}},25:{amt: 0, cat: {}},26:{amt: 0, cat: {}},27:{amt: 0, cat: {}},28:{amt: 0, cat: {}},29:{amt: 0, cat: {}},30:{amt: 0, cat: {}},31:{amt: 0, cat: {}}}
            });

            this.remainingBudget = (docSnap3.data().total / 30).toFixed(2)
            }




        },
        googleSignOut() {
          const auth = getAuth();
          signOut(auth).then(() => {
          // Sign-out successful.
          alert("Successful Sign Out")
          console.log(getAuth().currentUser)
          location.reload()
          }).catch((error) => {
          // An error happened.
          console.log(error)
          });
        },
        rowTemplate: 
          function () {
              return { template : Vue.component('rowTemplate',{
                  template: `<tr>
                  <td class="border" style='padding-left:18px;'>
                    {{data.Subject}}
                  </td>
                  <td class="border" style='padding: 10px 0px 0px 20px;'>
                    {{data.StartTime}}
                  </td>
                  <td class="border">
                    {{data.EndTime}}
                  </td>
                  </tr>`
        })}},
        spendingtime() {
          //onload, take into account percentagedone to set stroke-dashoffset
          let percenty=this.percentagedone;
          percenty*=472;
        }
  }
}

</script>

<style>

@import '../Background.css';
/* @media only screen and (max-width: 768px) {
    .newnavbar_margin {
      margin-left: 0rem;
    }

}


@media only screen and (min-width: 768px) {
    .newnavbar_margin {
      margin-left: 6rem;
    }
} */

.skill {
    width:160px;
    height:160px;
    position: relative;
    margin:auto;
    padding:0;
    box-sizing:border-box;
    font-family: 'Poppins', sans-serif;
    display:flex;
    align-items:center;
    justify-content: center;
}
.outer {
    height:160px;
    width:160px;
    border-radius:50%;
    padding:20px;
    /* box-shadow:6px 6px 10px -1px rgba(0,0,0,0.15), */
    /* -6px -6px 10px 1px rgba(255,255,255,0.7); */
    
}

.inner {
    height:120px;
    width:120px;
    border-radius: 50%;
    display:flex;
    align-items:center;
    justify-content: center;
    box-shadow: inset 4px 4px 6px -1px rgba(0,0,0,0.2),
                inset -4px -4px 6px -1px rgba(255,255,255,0.7),
                -0.5px -0.5px 0px rgba(255,255,255,1),
                0.5px 0.5px 0px rgba(0,0,0,0.15),
                0px 12px 10px -10px rgba(0,0,0,0.05);
                
}
#number {
    font-weight: 600px;
    color: #555;
}
circle {
    fill:none;
    stroke:url(#GradientColor);
    stroke-width: 20px;
    stroke-dasharray: 472; /* for some reason the complete circle is 472 LOL */
    stroke-dashoffset: 472;
    animation: anim 1s linear forwards;
}

main > div {
  margin-left: var(--marg-left)
}
h3 > div {
  background-color: var(--background-color);
  border-radius: 8px;
  padding:5px 0px;
  margin:0px 10px;
  color: #484C66;
}

.mysvg {
    position:absolute;
    top:0;
    left:0;
}
@keyframes anim{
    100%{
        stroke-dashoffset: var(--numbers) /*this is what actually controls the % so later when taking in data, modify this*/
    }
}

@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-treegrid/styles/material.css";

.e-treegrid .e-rowcell.customcss{
    background-color: #ecedee;
    font-family: 'Bell MT';
    color: 'red';
    font-size: '20px';
}

.e-treegrid .e-headercell.customcss{
    background-color: #B19CD9;
    color: white;
    filter: opacity(70%);
    font-family: 'Bell MT';
    font-size: '20px';
}

</style>