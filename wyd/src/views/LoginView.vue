<template>
  

<section class="introduction">
  <header>
    <h2 class="logo">Wad are you 2 Doing</h2>
  </header>
  <video src="../media/productivity.mp4" muted loop autoplay></video>

  <div class="overlay"></div>
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


<section class="toDo">
  <div class="overlay"></div>
  <div class="text-toDo">
    <h2>The To-Do List</h2>
    <h3>Set tasks in an instance</h3>
  </div>
  <div class="reveal">
    <img src="../media/To-Do-List.png">
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
  

  