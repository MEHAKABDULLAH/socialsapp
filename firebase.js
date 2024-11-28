 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 
 import { getAuth,onAuthStateChanged
  ,signInWithEmailAndPassword,sendEmailVerification,GoogleAuthProvider,signInWithPopup,
  sendPasswordResetEmail,deleteUser, createUserWithEmailAndPassword,signOut
 } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

 import { getFirestore,collection, addDoc,getDocs,Timestamp,query,orderBy,limit,doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

 

 const firebaseConfig = {
   apiKey: "AIzaSyCgcvF5jl0GagEdYpu0sfnzgNqc9_XaElM",
   authDomain: "sign-login-page-e7d3d.firebaseapp.com",
   projectId: "sign-login-page-e7d3d",
   storageBucket: "sign-login-page-e7d3d.firebasestorage.app",
   messagingSenderId: "165107396009",
   appId: "1:165107396009:web:cdcad1aba724a08defa8b8",
 };
 
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 const db = getFirestore(app);





 export{ app,auth,
  onAuthStateChanged,signInWithEmailAndPassword,sendEmailVerification,
  GoogleAuthProvider,provider,signInWithPopup,sendPasswordResetEmail,deleteUser,createUserWithEmailAndPassword,signOut, db,
  getFirestore,
  collection, 
  addDoc,getDocs,
  Timestamp,
  query,
  orderBy, limit,doc, deleteDoc};
 