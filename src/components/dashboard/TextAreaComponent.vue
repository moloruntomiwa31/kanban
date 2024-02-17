<template>
  <label :for="label" class="font-bold capitalize text-[#5a595c]">{{
    label
  }}</label>
  <textarea
    cols="30"
    rows="5"
    class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
    :value="modelValue"
    :placeholder="placeholder"
    v-bind="$attrs"
    @input="handleInput($event.target?.value)"
    :class="{'border-red-800 border-2' : error}"
  ></textarea>
  <span v-if="error" class="text-red-500 block">Cannot be empty!</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  label: string;
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const error = ref(false)


const handleInput = (value: string) => {
  error.value = value.trim() === ""; // Check if the input is empty
  emit("update:modelValue", value);
};
</script>

<style lang="scss" scoped></style>
