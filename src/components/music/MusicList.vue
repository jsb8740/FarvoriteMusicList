<script setup lang="ts"></script>
<template>
  <div class="playList">
    <slot name="thumbnail">썸네일</slot>
    <slot name="title">제목</slot>
    <slot name="desc">간단한 설명</slot>
  </div>
</template>

<style scoped lang="scss">
.playList {
  border: 1px solid #afc4e7;
  padding: 20px 50px;
}
</style>
