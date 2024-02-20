<template>
  <div
    class="shadow w-[200px] p-8 rounded-lg space-y-4 fixed top-[6rem] right-[2rem] md:right-[7rem] bg-red-100 lg:right-[12rem] z-50"
    :class="{ 'slide-in': showDetails, 'slide-out': !showDetails }"
    v-if="showDetails"
  >
    <button @click="handleEdit">{{ firstValue }}</button>
    <button @click="handleDelete" class="text-red-400">
      {{ secondValue }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showDetails: boolean;
  firstValue: String;
  secondValue: String;
}>();

const emit = defineEmits(["edit", "delete"]);

const handleEdit = () => {
  emit("edit");
};

const handleDelete = () => {
  emit("delete");
};
</script>

<style scoped>
.slide-in {
  animation: slide-in 0.5s linear;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.slide-out {
  animation: slide-out 0.5s linear;
}
@keyframes slide-out {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
