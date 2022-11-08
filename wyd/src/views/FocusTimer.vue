<template>

<div :style="{'margin-left': navbarWidth}">

  <div class="mt-4 text-center">

    <div>
      <button
          class="button active mode-button mx-2 px-4"
          id="focus"
        >
          Focus
        </button>
        <button
          class="button mode-button mx-2 px-4"
          id="breakie"
        >
          Break
        </button>
    </div>
    <br>
    <div class="clock bg px-5 py-3 mb-4" id="time" style="border-radius:30px;margin:auto;width:55%;text-align:center;">
      00:00
    </div>

    <div class="mb-4">
      <input type="text" id="min" placeholder="How many minutes would you like to focus?" class="w-50"><br>
      <button id="btn" class="main-button" @click="timer()">Start</button>&nbsp
      <button id="pause" class="main-button" @click="pause()">Pause</button>&nbsp
      <button id="stoppie" class="main-button" @click="stoppie()">Stop</button>
    </div>

  </div>
  </div>


</template>

<script>
//IMPORTS
import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';

//EXPORTS
export default {
  name: 'FocusTimer',

  setup() {
    return {open, toggleNavbar, navbarWidth}
  },

  data() {
    
  },

  methods: {


timer() {
  var self=this;
  let myCounter;
  let seconds = 60;
  clearInterval(myCounter);
  let mins = Number(document.getElementById('min').value);
  var i = mins * seconds;
  myCounter = setInterval(function() {
    if (i <= 0) {
      console.log('completed');
      clearInterval(myCounter);
      let time = document.getElementById('time');
      time.innerHTML='00:00'
      //here i would ideally send the information to the database!

    } else {
      
      let time = document.getElementById('time');
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
},

pause() {
  clearInterval(this.interval);
  console.log(this.interval);
},

stoppie() {
  let time = document.getElementById('time');
  clearInterval(this.interval);
  console.log(this.interval);
  time.innerHTML=('00:00');
}
  },

}



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

button:focus, button:active {
  outline: none;
}

.main-button.active {
  transform: translateY(6px);
  box-shadow: none;
  outline: none;
}

@media screen and (max-width: 550px) {
  .clock {
    font-size: 8rem;
  }
}

</style>
