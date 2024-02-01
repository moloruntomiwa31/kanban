<template>
  <Transition name="modal-fade">
    <Teleport to="body">
      <section class="new-board-modal" @click="handleCloseModal">
        <Transition name="slide-in">
          <div class="modal" @click.stop>
            <div class="header">
              <slot name="header" />
            </div>
            <fieldset class="grid space-y-3 mt-4">
              <slot name="body" />
            </fieldset>
          </div>
        </Transition>
      </section>
    </Teleport>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeModal"]);
const handleCloseModal = () => {
  emit("closeModal");
};
</script>

<style scoped lang="scss">
@import "../../assets/main.scss";
.new-board-modal {
  @include centerMixin;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  min-height: 100vh;
  min-width: 100%;

  label {
    color: #828fa3;
    font-weight: 600;
  }

  .modal {
    background-color: #fff;
    padding: 1.3rem;
    border-radius: 0.7rem;
    min-width: 80%;
    max-width: 500px;
    height: 400px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgb(253, 175, 175);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #635fc7;
      border-radius: 6px;
    }

    @media screen and (min-width: 768px) {
      min-width: 40%;
      // height: 300px;
    }
  }
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s linear;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.slidein-enter-from,
.slidein-leave-to {
  transform: translateY(1.5rem);
  opacity: 0;
}

.slidein-enter-active,
.slidein-leave-active {
  transition: all 0.4s ease;
}

.slidein-enter-to,
.slidein-leave-from {
  transform: translateY(0rem);
  opacity: 1;
}
</style>
