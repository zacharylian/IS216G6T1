<template>

<body>

<section id="introduction">
<div class="context">
    <h1>Wad are you 2 Doing</h1>

    <br/>

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


    <br/>
    <div class="appInformation">
      To-Do List  
      &nbsp; &nbsp; | &nbsp; &nbsp;
      Budget & Expenditure 
      &nbsp; &nbsp; | &nbsp; &nbsp;
      Focus Timer 
      &nbsp; &nbsp; | &nbsp; &nbsp;
      Calendar
    </div>

    <br/>

        <div>
          <button @click="googleSignIn" class="btn-flip" data-front="Sign in with Google" data-back="Productive Time!">
          </button>
        </div>


</div>
</section>

<div class="area" >
          <ul class="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
          </ul>
    </div>

<section class="explanation">
  <header>
    <h2 class="logo">Wad are you 2 Doing</h2>
  </header>
  <video src="../media/productivity.mp4" muted loop autoplay></video>

  <div class="overlay"></div>
  <div class="text">
    <div id="tagline2">
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
    
    <button @click="googleSignIn" class="btn-flip-2" data-front="Sign in with Google" data-back="Productive Time!">
    </button>


  </div>
</section>

</body>

</template>
<script>
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
  

  