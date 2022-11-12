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

<!-- <main> -->
  <div :style={navbar_margin}>  

  <div class="pt-3 m-auto" style="width:90vw;height:100%">

<div class="row" >
  <div class="col col col-xxl-7 col-xl-7 col-md-12">
          <div class="row">
            <div class="col mt-2">
            <!--NAME-->
            <h1 class="px-3 py-1" style="text-align:left;font-style:italic;height:5vw;color:whitesmoke">hi, <b style="">{{this.username}}!</b></h1>
          </div></div>
          <div class="row">
            <div class="col wanbottom pb-4" style="height:340px">
            <!--UPCOMING EVENTS-->
            <h3 class="py-2" style="font-style:normal;">upcoming events</h3>
            <div class="d-flex justify-content-center align-items-center" style="overflow:auto;margin:auto;z-index:-1">
              <ejs-treegrid :dataSource="data" :treeColumnIndex="3" width="600">
                  <e-columns>
                      <e-column field="Subject" headerText="Name" width="300" textAlign="center" :customAttributes="{class: 'customcss'}"></e-column>
                      <e-column field="StartTime" headerText="Start" width="100" format="yMd" textAlign="center" :customAttributes="{class: 'customcss'}"></e-column>
                      <e-column field="EndTime" headerText="End" width="100" format="yMd" textAlign="center" :customAttributes="{class: 'customcss'}"></e-column>
                  </e-columns>
              </ejs-treegrid>
            </div>
          </div>
          </div>
          <div class="row wanbottom">
            <div class="col py-2 bg wanright" style="height:230px">
              <!--EXPENSES-->
              <h3>expenses<br><br></h3>
              <div class="mx-3" style="margin:auto;">
              <!-- cld potentially use the same code for progress circle as focus time today.
                can modify colours & variables no problemo -->
              <br><h4>$40/$50</h4></div>
              <br>
              </div>
              <div class="col py-2  wanright" style="height:230px">
              <!--FOCUS TIME TODAY-->
              <h3 style="font-style:normal">focus time today:</h3>
              <div>
                <div class="skill">
                  <div class="outer bg">
                      <div class="inner">
                          <div id="number">
                              {{this.percentagedone}}%
                          </div>
                      </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px" class="mysvg">
                      <defs>
                          <linearGradient id="GradientColor">
                            <stop offset="0%" stop-color="#e91e63" />
                            <stop offset="100%" stop-color="#5865F2" />
                          </linearGradient>
                      </defs>
                      <circle cx="80" cy="80" r="70" stroke-linecap="round" :style='cssVars'/>
                  </svg>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col col-xxl-5 col-xl-12 col-md-12 bg px-5" style="overflow:auto;border-radius:20px;height:650px;width:500px;margin:auto;">
          <h3 class="p-2"><i>to-do list</i></h3>
          <todo></todo>          
        </div>
      </div>
</div>
</div>
<!-- </main>
</body> -->

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
    apptdata: appointmentData.sampleData,
    username: getAuth().currentUser.displayName,
    date: new Date(),
    percentagedone: 0,
    uid: "",
    goalhours: 0,
    totalduration: 0,
    
  }},

  computed: {
    cssVars() {
      return {
        '--numbers': 472 - (472 * this.percentagedone/100)
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
            this.apptdata = []
            for (var info of docSnap2.data().appointmentData){
              info.StartTime = new Date(info.StartTime.seconds*1000 + info.StartTime.nanoseconds/1000000)
              info.EndTime = new Date(info.EndTime.seconds*1000 + info.EndTime.nanoseconds/1000000)
              this.apptdata.push(info)
            }
            console.log(this.apptdata)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("=====creating calendar document=====")
            setDoc(docRef2, { treeviewData: [], appointmentData: []});
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
@media only screen and (max-width: 768px) {
    .navbar_margin {
      margin-left: 0rem;
    }

}


@media only screen and (min-width: 768px) {
    .navbar_margin {
      margin-left: 6rem;
    }
}

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