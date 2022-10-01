<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2 v-if="user">Signed in: {{ user }}</h2>
    </div>

    <br>

    <div id="logout" v-if="signedIn">
        <button @click="handleSignOut">Logout</button>
    </div>

    <div id="GoogleSignIn" v-if="signedIn">
        <h3>Google SignIn</h3>
        <button @click="handleSignInGoogle">Login</button>
    </div>
        
 
</template>
  
  <script>
    import firebaseConfig from "../firebaseConfig.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    firebaseConfig


  export default {
    name: 'Login',
    props: {
      msg: String
    },
    data() {
        return {
            user: "",
            signedIn: false,
        }
    },
    methods: {
        handleSignInGoogle() {
            signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                this.user = user.displayName;
                this.signedIn = true;
                // console.log(user.displayName);
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSignOut() {
          const auth = getAuth();
          signOut(auth).then(() => {
            this.user = "";
            this.signedIn = false;
          }).catch((error) => {
            console.log(error);
          });

        }
    }
  }
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
  