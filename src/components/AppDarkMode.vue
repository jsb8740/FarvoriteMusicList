<template>
  <div class="wrapper">
    <input type="checkbox" name="" id="switch" v-model="mode" />
    <label for="switch" class="switchLabel">
      <span class="switchButton"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const mode = ref(false);
</script>

<style scoped lang="scss">
.wrapper {
  #switch {
    appearance: none;
    display: block;
    &:checked + .switchLabel {
      background-color: black;
      .switchButton {
        transform: translateX(100%);
        background-color: black;
      }
    }
  }

  .switchLabel {
    cursor: pointer;
    width: 3.4rem;
    height: 2rem;
    padding: 0 0.4rem;
    border: 2px solid black;
    border-radius: 20px;
    display: flex;
    align-items: center;
    position: relative;
    transition: 1s;

    .switchButton {
      position: absolute;
      transition: 1s;
      border-radius: 1.5rem;
      height: 1.5rem;
      width: 1.5rem;
      border: 2px solid red;
    }
  }
}
</style>
