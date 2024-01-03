<template>
  <Teleport to="body">
    <div
      class="toast z-50 shadow rounded-lg bg-green-100 p-2 md:p-4 absolute top-[4.5rem] right-8"
      :class="toast.bgColor"
    >
      <i class="bx leading-3" :class="toast.icon"></i>
      <span>{{ toast.toastText }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from "@/stores/toast";

const toast = useToast();
</script>

<style scoped lang="scss">
.toast {
  animation: toast 0.8s linear;
}
.slide-out-toast {
  animation: slide-out-toast 0.8s linear;
}

@keyframes toast {
  0% {
    transform: translatex(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0rem);
    opacity: 1;
  }
}
@keyframes slide-out-toast {
  0% {
    transform: translatex(0%);
    opacity: 0;
  }
  100% {
    transform: translateX(100%);
    opacity: 1;
  }
}
</style>
