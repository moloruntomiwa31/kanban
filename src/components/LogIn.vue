<template>
  <h1 class="font-extrabold text-3xl">Log In</h1>
  <p>Enter your credentials to access your account.</p>
  <button
    @click="signInWithGoogle"
    class="font-bold w-full lg:w-3/4 justify-center flex items-center border-2 border-gray-500 p-3 rounded-md"
  >
    <img src="../assets/google.svg" alt="google-image" />
    Log in with Google
  </button>
  <div>
    <label for="email" class="font-bold text-md">Email Address</label>
    <InputComponent
      type="email"
      class="outline-[#a8a4ff] w-full lg:w-3/4 border-2 border-gray-500 p-2 rounded-lg block"
      placeholder="example@gmail.com"
      v-model="email"
    />
  </div>
  <div>
    <label for="password" class="font-bold text-md">Password</label>
    <InputComponent
      type="password"
      class="outline-[#a8a4ff] w-full lg:w-3/4 border-2 border-gray-500 p-2 rounded-lg block"
      placeholder="password"
      v-model="password"
    />
  </div>
  <button
    @click="logInWithEmailAndPassword(email, password)"
    class="outline-[#a8a4ff] bg-slate-800 p-3 hover:bg-slate-600 duration-100 rounded shadow text-white"
  >
    Log In
  </button>
</template>

<script setup lang="ts">
import InputComponent from "./dashboard/InputComponent.vue";
import { ref } from "vue";
import { useGoogle } from "../composables/useGoogle";
import { useEmailAndPassword } from "@/composables/useEmailAndPassword";

const { signInWithGoogle } = useGoogle();
const { logInWithEmailAndPassword } = useEmailAndPassword();
const email = ref("");
const password = ref("");
</script>

<style scoped></style>
