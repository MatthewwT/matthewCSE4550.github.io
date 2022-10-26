import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmA7fCrmuG-omROI3Ibjl_GjM3y7RBlPY",
  authDomain: "the-managers-4de5b.firebaseapp.com",
  databaseURL: "https://the-managers-4de5b-default-rtdb.firebaseio.com",
  projectId: "the-managers-4de5b",
  storageBucket: "the-managers-4de5b.appspot.com",
  messagingSenderId: "623742633722",
  appId: "1:623742633722:web:967d373cf0bf2d5126eb43",
  measurementId: "G-1NND7PD1NC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log(user);
  } else {
    console.log("no user");
  }
});


// log in user
submitData.addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
  
        // save log in details into real time database
        var lgDate = new Date();
        update(ref(database, "users/" + user.uid), {
          last_login: lgDate,
        })
          .then(() => {
            // Data saved successfully!
            alert("user logged in successfully");
            window.location = 'index.html'; //After successful login, user will be redirected
          })
          .catch((error) => {
            // The write failed...
            alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

      
      

  });