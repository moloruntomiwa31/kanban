<template>
    <label :for="label" class="font-bold capitalize text-[#5a595c]">{{ label }}</label>
  <textarea
    cols="30"
    rows="5"
    class="outline-[#a8a4ff] border-1 border-[#828FA3] p-2 rounded-lg"
    :value="modelValue"
    :placeholder="placeholder"
    @input="handleInput($event.target.value)"
  ></textarea>
</template>

<script setup lang="ts">

defineProps<{
    label: string,
    modelValue: string
    placeholder: string
}>()

const emit = defineEmits(["update:modelValue"])

const handleInput = (value: string) => {
    emit("update:modelValue", value)
}
</script>

<style lang="scss" scoped></style>
