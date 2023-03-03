<template>
  <TheViewLayout>
    <template #default>
      <div>
        <PlayListItem></PlayListItem>
      </div>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
</script>
<style scoped lang="scss">
img {
  width: 24px;
}
</style>
