<!-- InputComponent.vue -->
<template>
  <div class="grid">
    <input
      v-model="inputValue"
      @input="updateInput"
      :type="inputType"
      :placeholder="defalutPlaceholder"
      required
      v-bind="$attrs"
      :class="{ 'border-red-800 border-2': error }"
    />
    <span v-if="error" class="text-red-500 block">Cannot be empty!</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  initialValue: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  defalutPlaceholder: {
    type: String,
    default: "State Placeholder",
  },
});

const inputValue = ref(props.initialValue);
const error = ref(false);
const emit = defineEmits();

const updateInput = () => {
  error.value = inputValue.value.trim() === ""; // Check if the input is empty
  emit("updateInput", inputValue.value);
};

// Watch for changes in the initial value prop
watch(
  () => props.initialValue,
  (newVal) => {
    inputValue.value = newVal; // Update the input value when the prop changes
  }
);
</script>

<style lang="scss" scoped></style>
