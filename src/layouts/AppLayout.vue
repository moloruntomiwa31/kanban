<template>
  <div>
    <SideBar
      @openSideBar="openSideBar"
      :sideBarActive="sideBarActive"
      @createBoard="currentUser.createNewBoard = true"
    />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "../stores/user";
import { RouterView } from "vue-router";
import SideBar from "../components/SideBar.vue";

const currentUser= useUser();
const sideBarActive = ref<boolean>(false);
const openSideBar = () => {
  sideBarActive.value = !sideBarActive.value;
};
</script>

<style scoped></style>
