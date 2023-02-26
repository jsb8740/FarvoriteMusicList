<template>
  <div>
    <div>
      <h1>저장한 플레이리스트</h1>
      <div>플레이리스트들</div>
    </div>

    <!-- 컴포넌트화 해야할듯 -->
    <!-- 왁타버스 디자인 참고 -->
    <!-- iframe으로 display none -->
    <!-- or 서버에 음악을 저장 흠.. -->
    <hr />

    <!-- <PlayList>
      <template #playListTitle>저장한 플레이리스트</template>
      <div v-for="index in 4" :key="index">
        <PlayListItem></PlayListItem>
      </div>
    </PlayList> -->

    <hr />

    <div>
      <h1>공개된 플레이리스트</h1>
      <div>플레이리스트들</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
