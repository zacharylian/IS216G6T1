<template>
  <div>
    <button v-on:click="googleSignIn">
      Sign In with Google
    </button>
  </div>
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
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  