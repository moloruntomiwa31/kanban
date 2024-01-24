<template>
  <div class="container">
    <div class="main-content flex items-center w-full">
      <!-- SignIn Details -->
      <div class="lg:w-2/4 space-y-4 m-auto">
        <component :is="selectedComponent" />
        <!-- Change Tabs -->
        <p class="text-gray-500 font-bold" v-if="selectedComponent === LogIn">
          Not a member?
          <span
            @click="selectedComponent = SignUp"
            class="cursor-pointer underline text-[#2b2c37]"
            >Sign up</span
          >
        </p>

        <p class="text-gray-500 font-bold" v-else>
          Already a member?
          <span
            @click="selectedComponent = LogIn"
            class="cursor-pointer underline text-[#2b2c37]"
            >Log In</span
          >
        </p>
      </div>
      <!-- Home Details -->
      <div class="hidden lg:block w-2/4 relative h-[600px]">
        <div class="quotes absolute top-10">
          <p class="text-3xl font-extrabold">
              Welcome to the simple way of managing your tasks.
          </p>
        </div>
        <div class="kanban-image absolute right-[-6rem] bottom-0">
          <img src="../assets/demo-light.png" alt="kanban-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import LogIn from "../components/LogIn.vue";
import SignUp from "../components/SignUp.vue";
const selectedComponent = shallowRef(LogIn);
</script>

<style scoped lang="scss">
@import "../assets/main.scss";
.container {
  @include centerMixin;
  min-height: 100vh;
  min-width: 100%;
  padding: 2rem;
}
</style>
