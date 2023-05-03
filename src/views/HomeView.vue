<template>
  <TheViewLayout>
    <template #default>
      <div class="test">
        <PlayerArea></PlayerArea>
        <AppMarquee></AppMarquee>
      </div>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayerArea from "@/components/player/PlayerArea.vue";
import AppMarquee from "@/components/common/AppMarquee.vue";
</script>
<style scoped lang="scss">
.test {
  width: 100%;
}
</style>
