<template>
  <Modal @closeModal="handleCloseModal" v-if="deleteBoard">
    <template #header>
      <h2 class="capitalize font-bold text-xl text-red-500">
        Delete this board?
      </h2>
    </template>
    <template #body>
      <p>
        Are you sure you want to delete the
        <span class="font-bold">{{ boardTitle }}</span> board? This action will
        remove all columns and tasks and cannot be reversed.
      </p>
      <div class="flex w-full space-x-3 justify-between items-center">
        <button
          class="p-3 rounded-full font-bold text-center bg-red-500 w-1/2 text-white hover:opacity-75 duration-150"
          @click="removeBoard"
        >
          Delete
        </button>
        <button
          class="p-3 rounded-full font-bold text-center bg-gray-200 w-1/2 text-purple-500 hover:opacity-75 duration-150"
          @click="handleCancel"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../dashboard/Modal.vue";
defineProps<{
  boardTitle: string;
  deleteBoard: boolean;
}>();

const emit = defineEmits(["closeModal", "cancel", "removeBoard"]);

const handleCloseModal = () => {
  emit("closeModal");
};
const handleCancel = () => {
  emit("cancel");
};
const removeBoard = () => {
  emit("removeBoard");
};
</script>

<style scoped></style>
