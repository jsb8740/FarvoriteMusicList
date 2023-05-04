<template>
  <div class="contentLayout">
    <h1>
      <slot name="title"></slot>
    </h1>
    <hr />
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
h1 {
  font-weight: 700px;
  color: white;
  margin-left: 3%;
}

hr {
  margin: 1rem 3% 3rem 3%;
}
</style>
