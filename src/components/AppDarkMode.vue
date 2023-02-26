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
  }

  #switch:checked + .switchLabel {
    background-color: black;
  }

  .switchLabel {
    cursor: pointer;
    width: 4rem;
    height: 2rem;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 0.4rem;

    .switchButton {
      border-radius: 1.5rem;
      height: 1.5rem;
      width: 1.5rem;
      border: 1px solid red;
    }
  }
}
</style>
