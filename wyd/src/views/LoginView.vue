<template>

<section id="introduction">

<header>
  <a class="logo" href="#introduction">Wad are you 2 Doing</a>
  <div class="navigation">
    <div class="navigation-items">
        <a href="#toDo">To-Do</a>
        <a href="#expenditure">Expenditure</a>
        <a href="#calendar">Calendar</a>
        <a href="#focusTimer">Focus Timer</a>
    </div>
  </div>
</header>

  <video class="video-slide" src="../media/productivity.mp4" muted loop autoplay></video>

  <div class="text">
    <div id="tagline">
          Stay
      <div class="scroller" style="color: #7289DA">
        <span>
          Focus.<br/>
          Ready.<br/>
          Saucy.<br/>
          Krazy.<br/>
        </span>
      </div>
    </div>
    <p>To-Do Planning . Expenditure . Calendar . Focus Timer</p>
    
    <button @click="googleSignIn" class="btn-flip" data-front="Sign in with Google" data-back="Productive Time!">
    </button>

  </div>
</section>


<section id="toDo">
  <header>
  <a class="logo" href="#introduction">Wad are you 2 Doing</a>
  <div class="navigation">
    <div class="navigation-items">
        <a href="#toDo">To-Do</a>
        <a href="#expenditure">Expenditure</a>
        <a href="#calendar">Calendar</a>
        <a href="#focusTimer">Focus Timer</a>
    </div>
  </div>
</header>
  <div class="text-toDo">
    <h2>To-Do List</h2>
    <h3>Set and Clear Tasks</h3>
    <p>Seamless way to keep track of tasks at hand</p>
  </div>
  <div class="reveal">
    <img src="../media/To-Do-List.png">
  </div>
</section>

<section id="expenditure">
  <header>
  <a class="logo" href="#introduction">Wad are you 2 Doing</a>
  <div class="navigation">
    <div class="navigation-items">
        <a href="#toDo">To-Do</a>
        <a href="#expenditure">Expenditure</a>
        <a href="#calendar">Calendar</a>
        <a href="#focusTimer">Focus Timer</a>
    </div>
  </div>
</header>
  <div class="text-expenditure">
    <h2>Expenditure</h2>
    <h3>Manage your Spending</h3>
    <p>Active tracking of budget and purchases</p>
  </div>
  <div class="reveal">
    <img src="../media/Expenditure.png">
  </div>
</section>

<section id="calendar">
  <header>
  <a class="logo" href="#introduction">Wad are you 2 Doing</a>
  <div class="navigation">
    <div class="navigation-items">
        <a href="#toDo">To-Do</a>
        <a href="#expenditure">Expenditure</a>
        <a href="#calendar">Calendar</a>
        <a href="#focusTimer">Focus Timer</a>
    </div>
  </div>
</header>
  <div class="text-calendar">
    <h2>Personalized <br/> Calendar</h2>
    <h3>Never miss an event</h3>
    <p>Add events, reminders and tasks <br/>
      <i>(Google Calendar sync available)</i></p>
  </div>
  <div class="reveal">
    <img src="../media/Calendar.png">
  </div>
</section>

<section id="focusTimer">
  <header>
  <a class="logo" href="#introduction">Wad are you 2 Doing</a>
  <div class="navigation">
    <div class="navigation-items">
        <a href="#toDo">To-Do</a>
        <a href="#expenditure">Expenditure</a>
        <a href="#calendar">Calendar</a>
        <a href="#focusTimer">Focus Timer</a>
    </div>
  </div>
</header>
  <div class="text-focusTimer">
    <h2>Focus Timer</h2>
    <h3>Stay in the Zone</h3>
    <p>Maintain optimal productivity throughout the day</p>
  </div>
  <div class="reveal">
    <img src="../media/Timer.png">
  </div>
</section>

</template>
<script>
  import '@/LoginView'
  import Navbar from '../components/layouts/navbar.vue'
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
  export default {
      methods: {
          googleSignIn() {
            console.log("=====hello im here=====")
              // We'll create functionality here
              const auth = getAuth();
              const provider = new GoogleAuthProvider()
              console.log("=====furry balls=====")
              signInWithPopup(auth, provider)
            .then((result) => {
              console.log(getAuth().currentUser)
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // ...
              this.$router.push('/')
              
            }).catch((error) => {
              console.log("===== your moms funny =====")
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
          },
      },

      components: { Navbar }
  };

</script>

  