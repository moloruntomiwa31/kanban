<template>
  <div class="sidebar" :class="{ active: sideBarActive }">
    <div class="top">
      <div class="logo">
        <img src="../assets/logo-mobile.svg" alt="kanbanlogo" />
        <span class="text-2xl font-bold">kanban</span>
      </div>
      <button id="btn" @click="openSideBar">
        <i class="bx bx-menu"></i>
      </button>
    </div>
    <ul>
      <p
        class="uppercase board-detail text-white font-bold hover:cursor-pointer"
        @click="$router.push('/dashboard')"
      >
        All boards ({{ newBoards.length }})
      </p>
      <li v-for="board in newBoards" :key="board.id">
        <RouterLink
          :to="`/dashboard/board/${board.id}`"
          active-class="active-board"
        >
          <i class="bx bx-grid-alt"></i>
          <span class="nav-item">{{ board.name }}</span>
        </RouterLink>
        <span class="tooltip">{{ board.name }}</span>
      </li>
      <li>
        <button @click="createBoard">
          <i class="bx bxs-message-alt-add"></i>
          <span class="nav-item">New Board</span>
        </button>
        <span class="tooltip">New Board</span>
      </li>

      <li>
        <button @click="signOutFromGoogle">
          <i class="bx bxs-log-out"></i>
          <span class="nav-item">Logout</span>
        </button>
        <span class="tooltip">Logout</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useGoogle } from "@/composables/useGoogle";
import { useCreateBoard } from "../stores/board";

const { newBoards } = useCreateBoard();

const { signOutFromGoogle } = useGoogle();
defineProps<{
  sideBarActive: boolean;
}>();

//events
const emit = defineEmits<{
  (e: "createBoard"): void;
  (e: "openSideBar"): void;
}>();

const createBoard = () => {
  emit("createBoard");
};
const openSideBar = () => {
  emit("openSideBar");
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 50px;
  background-color: #20212c;
  padding: 0.4rem 0.8rem;
  transition: all 0.5s ease;
  z-index: 100;

  #btn {
    position: absolute;
    color: #fff;
    top: 1.2rem;
    font-size: 1.4rem;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }

  .top {
    .logo {
      color: #fff;
      display: flex;
      height: 50px;
      width: 100%;
      align-items: center;
      pointer-events: none;
      opacity: 0;
    }
  }

  ul {
    .board-detail {
      opacity: 0;
    }
    li {
      position: relative;
      list-style-type: none;
      height: 50px;
      width: 90%;
      margin: 0.8rem auto;
      line-height: 50px;

      .active-board {
        color: red;
      }
      a,
      button {
        display: flex;
        align-items: center;
        color: #fff;
        border-radius: 3px;

        // &:hover {
        //   color: #e8e4e4;
        // }

        i {
          min-width: 30px;
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
      }

      .tooltip {
        position: absolute;
        left: 125px;
        top: 100%;
        transform: translate(-50%, -50%);
        border-radius: 0.6rem;
        padding: 0.4rem 1.2rem;
        line-height: 1.8rem;
        z-index: 20;
        box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
        opacity: 0;
        min-width: fit-content;
        white-space: nowrap;
      }
    }
  }
}

.sidebar.active ~ .main-content {
  left: 250px;
  width: calc(100% - 250px);
}
.sidebar.active {
  width: 250px;
}
.sidebar.active #btn {
  left: 90%;
}
.sidebar.active .top .logo {
  opacity: 1;
}
.sidebar .nav-item {
  opacity: 0;
}
.sidebar.active .nav-item {
  opacity: 1;
}
.sidebar ul li:hover .tooltip {
  opacity: 1;
}
.sidebar.active ul li .tooltip {
  display: none;
}
.sidebar.active ul .board-detail {
  opacity: 1;
}
.sidebar.active .active-board {
  background-color: red;
  color: white;
}
</style>
