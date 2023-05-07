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
}

hr {
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}
</style>
