<template>

<!-- <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#introduction">Log In</b-nav-item>
        <b-nav-item href="#toDo">To Do</b-nav-item>
        <b-nav-item href="#calendar">Calendar</b-nav-item>
        <b-nav-item href="#expenditure">Expenditure</b-nav-item>
        <b-nav-item href="#focusTimer">Timer</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div> -->

<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" style="color:#5E6EE6;font-weight:bold;font-size:30px;font-style:italic;">CONCORD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#introduction">Log In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#toDo">To-Do</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#calendar">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#expenditure">Expenditure</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#focusTimer">Timer</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<section id="introduction">

<video class="video-slide" src="../media/productivity.mp4" muted loop autoplay></video>

<div class="text">
  <div id="tagline">
        Stay
    <div class="scroller" style="color: #5E6EE6">
      <span>
        Focused.<br/>
        Prepared.<br/>
        Organised.<br/>
        Managed.<br/>
      </span>
    </div>
  </div>
  <p>To-Do Planning . Calendar . Expenditure . Focus Timer</p>
  
  <button @click="googleSignIn();" class="btn-flip" data-front="Sign in with Google" data-back="Productive Time!" style="font-family: 'Poppins', sans-serif;background-color:white">

  </button>
  <!-- REFERENCE: https://codepen.io/MoorLex/pen/NBwNZa, https://www.w3schools.com/cssref/pr_scroll-behavior.php-->

</div>
</section>


<section id="toDo">
<div class="row">
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
    <div class="text-toDo">
      <h2>To-Do List</h2>
      <h3>Set and Clear Tasks</h3>
      <p>Seamless way to keep track of tasks at hand</p>
    </div>
  </div>
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12">
    <div class="reveal">
      <img src="../media/To-Do-List.png">
    </div>
  </div>
</div>
</section>

<section id="expenditure">
<div class="row">
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
    <div class="text-expenditure">
      <h2>Expenditure</h2>
      <h3>Manage your Spending</h3>
      <p>Active tracking of budget and purchases</p>
    </div>
  </div>
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12">
    <div class="reveal">
      <img src="../media/Expenditure.png">
    </div>
  </div>
</div>
</section>

<section id="calendar">
<div class="row ">
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
    <div class="text-calendar">
      <h2>Personalized <br/> Calendar</h2>
      <h3>Never miss an event</h3>
      <p>Add events, reminders and tasks <br/>
        <i>(Google Calendar sync available)</i></p>
    </div>
  </div>
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12">
    <div class="reveal">
      <img src="../media/Calendar.png">
    </div>
  </div>
</div>

</section>

<section id="focusTimer">
<div class="row ">
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
    <div class="text-focusTimer">
      <h2>Focus Timer</h2>
      <h3>Stay in the Zone</h3>
      <p>Maintain optimal productivity throughout the day</p>
    </div>
  </div>
  <div class="col col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12">
    <div class="reveal">
      <img src="../media/Timer.png">
    </div>
  </div>
</div>
</section>


</template>
<script>
  import '@/LoginView'
  import Navbar from '../components/layouts/navbar.vue'
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
  export default {
      methods: {
          showAlert() {
            console.log('test')
            this.$swal({
              title:'Login successful',
                  text: 'Productivity starts now!', 
                  animation: false,
                  customClass: {
                    icon: 'no-border'
                    },
                  showConfirmButton: true,
                  background: 'rgba( 230, 232, 255, 0.8 )',
                  backdrop: `blur( 9px )`,
                  confirmButtonColor: '#5E6EE6',
                  color: '#4955b3'
            })
          },
          googleSignIn() {
              // We'll create functionality here
              const auth = getAuth();
              const provider = new GoogleAuthProvider()
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
              .then(this.showAlert())
            }).catch((error) => {
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

  