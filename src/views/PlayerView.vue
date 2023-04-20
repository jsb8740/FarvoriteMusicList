<template>
  <PlayerArea :type="typeComputed"></PlayerArea>
</template>

<script setup lang="ts">
import PlayerArea from "@/components/player/PlayerArea.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const typeComputed = computed(() =>
  route.params.type === "favorites" ? `${route.params.type}` : "playlist"
);
</script>

<style scoped></style>
