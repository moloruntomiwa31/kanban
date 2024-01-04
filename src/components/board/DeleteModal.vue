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
      <div class="flex justify-around items-center">
        <button
          class="bg-red-400 text-white p-4 rounded-3xl"
          @click="removeBoard"
        >
          Delete
        </button>
        <button
          class="bg-gray-200 text-[#635fc7] p-4 rounded-3xl"
          @click="handleCancel"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../dashboard/Modal.vue"
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
