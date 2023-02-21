<script setup lang="ts">
import LeftArrow from "@/components/icons/LeftArrow.vue";
import RightArrow from "@/components/icons/RightArrow.vue";
</script>
<template>
  <div>
    <div class="PlayList">
      <div class="PlayListTitle">
        <slot name="playListTitle">PlayList</slot>
      </div>

      <div class="ListButton">
        <button>더보기</button>
        <LeftArrow></LeftArrow>
        <RightArrow></RightArrow>
      </div>
    </div>

    <div class="playListItem">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.playListItem {
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 100px;
}

.PlayList {
  display: flex;
  justify-content: space-between;

  .ListButton {
    display: flex;
    gap: 10px;
    align-items: end;
    button {
      margin-right: 20px;
    }
  }
  .PlayListTitle {
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
