import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7AJ6noZhWwwvnoyr-E7X7Hhr1WeqyGR4",
  authDomain: "kanban-81702.firebaseapp.com",
  projectId: "kanban-81702",
  storageBucket: "kanban-81702.appspot.com",
  messagingSenderId: "594483971527",
  appId: "1:594483971527:web:b1b5494e2b3c15db9545e2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {auth, app}