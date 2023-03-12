<template>
  <div class="row">
    <slot name="order">#1</slot>
    <slot name="thumbnail">
      <img src="@/assets/test/test1.jpg" alt="test" srcset="" />
    </slot>

    <slot name="title">title</slot>
    <slot name="time">time</slot>
    <slot name="heart">Heart</slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.row {
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 0;
  img {
    height: 100%;
    width: auto;
    border-radius: 0.3rem;
  }
}
</style>
