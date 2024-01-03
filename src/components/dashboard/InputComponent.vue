<!-- InputComponent.vue -->
<template>
  <input
    v-model="inputValue"
    @input="updateInput"
    :type="inputType"
    :placeholder="defalutPlaceholder"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

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
const emit = defineEmits();

const updateInput = () => {
  emit("updateInput", inputValue.value); 
};
</script>

<style lang="scss" scoped></style>
