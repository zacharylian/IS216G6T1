<template>

  <navbar></navbar>
<div class="d-flex justify-content-center align-items-center h-100" style="margin-left:6rem;overflow:hidden;">

  <div class="mt-5 text-center">
    <div class="mt-4">
      <label for='goalhours' class='h4 font-weight-bold'>How many hours would you like to focus today?&nbsp&nbsp</label>
        <input type="text" id="goalhours" class="h5 text-center font-weight-bold bg" placeholder="0 hours" v-model="goalhours" style="width:6.2vw;border:none;border-radius:5px">&nbsp;&nbsp;&nbsp;
        <button class="main-button2 mt-0" style="font-size:2vw;border:none;width:3vw;height:3vw;text-align:center" @click="uppointfive()" >↑</button>&nbsp;
        <button class="main-button2 mt-0" style="font-size:2vw;border:none;width:3vw;height:3vw;text-align:center" @click="downpointfive()">↓</button><br>
        <!-- <button class="main-button mt-0" style="font-size:1.5vw;border:none;width:12vw;height:4vw" @click="submitgoal()">confirm?</button> -->
    </div>

    <br>
    <div class="row">
      <div class="col">
        <div class="clock bg px-5 py-3 mb-4" id="time" style="border-radius:30px;margin:auto;width:56vw;height:20vw;text-align:center;font-size:18vw;">
      00:00
    </div>
      </div>
    </div>
        <div class="row m-auto">
          <div class="col col-4"></div>
          <div class="col col-2 bg">
            <button class="main-button2 mt-0" style="font-size:3vw;border:none;width:4vw;" @click="upfive()">↑</button></div>
          &nbsp&nbsp&nbsp&nbsp
          <div class="col col-2 bg">
            <button class="main-button2 mt-0" style="font-size:3vw;border:none;width:4vw;" @click="downfive()">↓</button></div>
          <div class="col col-4"></div>
        </div><br>

    <div class="mb-4">
      <input type="text" id="min" placeholder="How many minutes would you like to focus? (Hit enter!)" class="text-center" @keypress.enter="enterTime()"><br>
      <button id="btn" class="main-button" @click="timer()">Start</button>&nbsp
      <button id="pause" class="main-button" @click="pause()">Pause</button>&nbsp
      <button id="stoppie" class="main-button" @click="stoppie()">Reset</button>
    </div>
<!-- <br>
<div class="h6 font-italic">Insert motivational prompts here...</div> -->
  </div>
  </div>


</template>

<script>
//IMPORTS
import navbar from '@/components/layouts/new_navbar.vue';
import { getAuth, signOut } from '@firebase/auth';
import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore';
import { db } from '../main';

//EXPORTS
export default {
  name: 'FocusTimer',
  components : {
    "navbar" : navbar
  },

  created(){
    console.log("=====getting UID=====")
        this.uid = getAuth().currentUser.uid
        console.log(this.uid)

        console.log("=====extracting data from db=====")
        this.checkdb()

  },


  data() {
    return {
      uid: "", //userid for checking db
      goalhours: '0', /* is stored in hours, one value per day */
      duration: '20', /* is stored in minutes, many values per day, one per instance */
      end_date: '09-11-2022', /* is stored in DD-MM-YYYY, one per instance */
      end_time: '03:52:46', /* is stored in HH:MM:SS, one per instance */
      totalduration: 0 //total duration focused
    }
  },

  methods: {
    async checkdb(){
            const docRef = doc(db, "focustimer", this.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            this.goalhours = docSnap.data().goalhours
            this.totalduration = docSnap.data().totalduration
            

            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("=====creating document=====")
            setDoc(docRef, {goalhours: parseFloat(this.goalhours), totalduration: 0 });
            }
        },
    async updatedb(){
        const docRef = doc(db, "focustimer", this.uid);
        await updateDoc(docRef, { goalhours: this.goalhours, totalduration: this.totalduration })

    },

showAlert() {
  this.$swal.fire({
                title:'Timer Stopped',
                text: 'Taking a break? No problem!', 
                imageUrl: 'https://images.unsplash.com/photo-1604815891325-0f9c17688328?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Kitkat break!',
                animation: false,
                timer: 5000,
                customClass: {
                  icon: 'no-border'
                },
                showConfirmButton: false
                }
  )
},

timer() {
  let time = document.getElementById('time');
  if (time.innerHTML == '00:00') {
              var self=this;
              let myCounter;
              let seconds = 60;
              clearInterval(this.interval);
              let mins = Number(document.getElementById('min').value);
              var i = mins * seconds;
              myCounter = setInterval(function() {
                if (i <= 0) {
                  console.log('completed');
                  clearInterval(myCounter);
                  time.innerHTML='00:00'
                  date=new Date();
                  duration=mins;
                  end_date=date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
                  end_time=date.getHours()+':'+date.getMinutes()+':';+date.getSeconds();
                  //here i would ideally send the information to the database!
                  this.totalduration += Number(duration)
                  console.log(this.totalduration)
                  this.updatedb()

                } else {
                  let minutess=Math.floor(i/60);
                  let secondss=i-minutess*60;
                  if (minutess<10) {
                    minutess="0"+minutess.toString();
                  }
                  if (secondss<10) {
                    secondss="0"+secondss.toString();
                  }
                  time.innerHTML = minutess+":"+secondss;
                  console.log(i--);
                  console.log(myCounter);
                }
              }, 1000);
              this.interval=myCounter;
                }
                  else {
                    var self=this;
                    let myCounter;
                    let seconds = 60;
                    clearInterval(this.interval);
                    let timearr=time.innerHTML.split(':');
                    let mins = Number(timearr[0]);
                    let seccy = Number(timearr[1]);
                    var i = mins * seconds + seccy;
                    myCounter = setInterval(function() {
                      if (i <= 0) {
                        console.log('completed');
                        clearInterval(myCounter);
                        time.innerHTML='00:00'
                        date=new Date();
                        duration=mins;
                        end_date=date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
                        end_time=date.getHours()+':'+date.getMinutes()+':';+date.getSeconds();
                        //here i would ideally send the information to the database!
                        this.totalduration += Number(duration)
                        this.updatedb()
                        //i j added the brackets here... if sth breaks then remove that i guess
                        //maybe can play a jingle when time ends?

                      } else {
                        let minutess=Math.floor(i/60);
                        let secondss=i-minutess*60;
                        if (minutess<10) {
                          minutess="0"+minutess.toString();
                        }
                        if (secondss<10) {
                          secondss="0"+secondss.toString();
                        }
                        time.innerHTML = minutess+":"+secondss;
                        console.log(i--);
                        console.log(myCounter);
                      }

                    }, 1000);
                    this.interval=myCounter;
                  }
},

pause() {
  clearInterval(this.interval);
  console.log(this.interval);
},

stoppie() {
  let time = document.getElementById('time');
  if (time.innerHTML != '00:00' && (this.interval)) {
    this.showAlert()
  }
  clearInterval(this.interval);
  console.log(this.interval);
  time.innerHTML=('00:00');
},

upfive() {
  console.log('Upfive!');
  let time = document.getElementById('time').innerHTML;
  console.log(time);
  let timearr=time.split(':');
  console.log(timearr);
  let minny=Number(timearr[0]);
  let secondy=Number(timearr[1]);
  if (minny*60+secondy <= 86100) {
  let newmins=Number(timearr[0])+5;
  newmins=newmins.toString();
  if (newmins.length<2) {newmins='0'+newmins};
  secondy=secondy.toString();
  if (secondy.length<2) {secondy='0'+secondy};
  let newtime=newmins+':'+secondy;
  document.getElementById('time').innerHTML=newtime;
  console.log(newtime);}
},

downfive() {
  console.log('Downfive!');
  let time = document.getElementById('time').innerHTML;
  console.log(time);
  let timearr=time.split(':');
  let currmins=Number(timearr[0]);
  if (currmins>0) {
  console.log(timearr);
  let newmins=Number(timearr[0])-5;
  let secondy=Number(timearr[1]);
  newmins=newmins.toString();
  if (newmins.length<2) {newmins='0'+newmins};
  secondy=secondy.toString();
  if (secondy.length<2) {secondy='0'+secondy};
  let newtime=newmins+':'+secondy;
  document.getElementById('time').innerHTML=newtime;
  console.log(newtime);
  }
},

uppointfive() {
  console.log('Uppointfive!');
  let goalhours = this.goalhours;
  if (Number(goalhours) <=23.5) {
  console.log(goalhours);
  goalhours=Number(goalhours)+0.5;
  console.log(goalhours);
  this.goalhours=goalhours;}
  this.updatedb()
},

downpointfive() {
  console.log('Downpointfive!');
  let goalhours = this.goalhours;
  if (Number(goalhours) > 0) {
  console.log(goalhours);
  goalhours=Number(goalhours)-0.5;
  console.log(goalhours);
  this.goalhours=goalhours;
  this.updatedb()
  }
  }
,

enterTime() {
  let mins = document.getElementById('min').value.toString();
  let minny=mins.split('.');
  console.log(minny);
  let minnys;
  let secs;
  if (minny.length>1) {
    minnys=minny[0];
    secs=Number(minny[1])/10*60;
    secs=secs.toString();
    if (secs.length > 2) {
    secs=secs.substring(0, 2);}
    console.log(minnys, secs);
  }
  else {
    minnys=mins;
    secs='00';
  }
  console.log(minnys, secs);
  if (minnys.length<2) {
    minnys='0'+minnys;
  }
  if (secs.length<2) {
    secs='00';
  }

  if (Number(mins)<=1400) {
  document.getElementById('time').innerHTML=minnys+':' + secs;
}
  document.getElementById('min').value='';
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

  submitgoal() {
    //record to database
  }
  }}

</script>

<style>

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--pomodoro);
  transition: background-color 1s ease;
      user-select: none;
}

.timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  text-align: center;
}

.clock {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 15rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content:center;
  color: #899DDF;
}

.mode-button {
  font-size: 16px;
  cursor: pointer;
  box-shadow: none;
  font-weight: bold;
  color: #F6F8FB;
  background-color:#7289DA;
  border: 1px solid transparent;
  margin: 0px;
  border-radius: 10px;
  padding: 4px 12px;
}

.mode-button.active {
  border-color: #7289DA;
  background: #EFF0FF;
  color: #7289DA
}

.main-button {
  cursor: pointer;
  font-size: 22px;
  height: 55px;
  text-transform: uppercase;
  color: #899DDF;
  font-weight: bold;
  width: 200px;
  background-color: #EFF0FF;
  border-width: initial;
  border-style: none;
  margin: 20px 0px 0px;
  padding: 0px 12px;
  border-radius: 30px;
  transition: color 0.5s ease-in-out 0s;
  border: 1px solid #7289DA;
  
}

.main-button2 {
  cursor: pointer;
      font-size: 22px;
  height: 55px;
  text-transform: uppercase;
  color: #899DDF;
  font-weight: bold;
  background-color: #EFF0FF;
  border-width: initial;
  border-style: none;
  margin: 20px 0px 0px;
  padding: 0px 12px;
  border-radius: 50%;
  transition: color 0.5s ease-in-out 0s;
  border: 1px solid #7289DA;
}

button:focus, button:active {
  outline: none;
}

/* .main-button.active {
  transform: translateY(6px);
  box-shadow: none;
  outline: none;
} */

@media screen and (max-width: 550px) {
  .clock {
    font-size: 8rem;
  }
}

/* sweetalert CSS */
.no-border {
  border: 0 !important;
}
</style>
