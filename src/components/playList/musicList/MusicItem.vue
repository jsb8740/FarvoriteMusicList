<template>
  <div class="row">
    <slot name="order">#1</slot>
    <slot name="thumbnail" class="thumbnail">
      <img src="@/assets/test/test1.jpg" alt="test" srcset="" />
    </slot>

    <div class="title">
      <slot name="title">title</slot>
    </div>

    <div class="time">
      <slot name="time">time</slot>
    </div>

    <div class="heart">
      <slot name="heart">Heart</slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.row {
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  background-color: white;
  border-radius: 0.7rem;
  img {
    /*height: 100%;
    width: auto;*/
    border-radius: 0.3rem;
  }
}
</style>
