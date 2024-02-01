<template>
  <div class="flex justify-between">
    <InputComponent
      :initialValue="columnValue"
      class="outline-[#a8a4ff] w-[90%] border-1 border-[#828FA3] p-2 rounded-lg grid"
      @updateInput="updateInputValue"
      placeholder="e.g Todo"
    />
    <button class="w-5" @click="removeInput">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          fill="gray"
          d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.499.499 0 0 0-.707 0L8 5L3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.499.499 0 0 0 0 .707L5 8L.146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.499.499 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.499.499 0 0 0 0-.707"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "./InputComponent.vue";
import { ref } from "vue";

const emit = defineEmits(["updateInputValue", "removeInput"]);
const props = defineProps(["initialValue"])
const columnValue = ref(props.initialValue || "");

const updateInputValue = (value: string) => {
  columnValue.value = value;
  emit("updateInputValue", columnValue.value);
};
const removeInput = () => {
  emit("removeInput");
};
</script>

<style lang="scss" scoped></style>
