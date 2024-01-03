<script setup lang="ts">
import { useGoogle } from "@/composables/useGoogle.ts";
import { useUser } from "../stores/user";
import { useRouter } from "vue-router";
import { useCreateBoard } from "../stores/board";
import NewBoardModal from "@/components/dashboard/NewBoardModal.vue";


const router = useRouter();
const { signOutFromGoogle } = useGoogle();
const currentUser = useUser();
const boardStore = useCreateBoard();
</script>

<template>
  <!-- New Board Modal -->
  <NewBoardModal/>

  <section class="main-content">
    <div class="header">
      <h1 class="text-2xl font-bold">Overview</h1>
      <button @click="signOutFromGoogle" class="font-bold text-xl">
        <i class="bx bxs-log-out"></i>LogOut
      </button>
    </div>
    <div class="container">
      <div class="greetings">
        <h2 class="text-xl font-bold whitespace-nowrap">
          Hello {{ currentUser.user?.displayName || currentUser.user?.email || "Anonymous" }}👋🏽,
        </h2>
        <p class="text-sm">
          Welcome back to Kanban!
          <span
            @click="currentUser.createNewBoard = true"
            class="underline cursor-pointer"
            >Create New Board</span
          >
        </p>
      </div>

      <!-- conditional rendering -->
      <div class="empty-board" v-if="boardStore.newBoards.length < 1">
        <div class="empty-text">
          <img
            src="../assets/clipboard.png"
            alt="clipboard-img"
            class="w-[200px] m-auto"
          />
          <h3 class="font-bold text-xl">No board added!</h3>
          <p class="text-sm">
            You have not created any board. When you add a new board, they'll
            show up here.
          </p>
        </div>
        <!-- if board has been created -->
      </div>
      <div
        v-else
        class="mx-[1.5rem] my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div v-for="board in boardStore.newBoards" :key="board">
          <div
            class="bg-white py-5 px-4 w-full md:w-[250px] text-left cursor-pointer z-20"
            @click="router.push(`/dashboard/board/${board.id}`)"
          >
            <h3 class="font-bold">{{ board.name }}</h3>
            <p class="flex items-center font-bold text-[0.8rem] text-gray-400">
              View Board<i
                class="bx bxs-right-arrow-circle text-lg text-emerald-400"
              ></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "../assets/main-content.scss";
.main-content {
  .container {
    .greetings {
      margin: 1rem 1.5rem;
    }
    .empty-board {
      margin: 1rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: white;
      padding: 3rem;
      border-radius: 2rem;
      height: 360px;
    }
    .empty-text {
      text-align: center;
      button {
        background-color: #635fc7;
        color: white;
        border-radius: 1.5rem;
        padding: 0.5rem;
        margin-top: 1rem;
      }
    }
  }
}
</style>
