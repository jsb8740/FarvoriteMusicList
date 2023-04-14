<template>
  <div class="marquee">
    <div>
      <span>
        <slot></slot>
      </span>
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "sass:math";
$divWidth: 400%;
$marqueeHeight: 1.6rem;
.marquee {
  height: $marqueeHeight + 0.5;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 2.5rem 0;

  div {
    display: block;
    width: $divWidth;
    height: 100%;

    position: absolute;
    overflow: hidden;

    animation: marquee 7s linear infinite;

    span {
      // float: left;
      // span을 50%로 div의 반반나눔
      display: inline-block;
      width: 50%;

      font-weight: 700;
      font-size: $marqueeHeight;
      line-height: $marqueeHeight;
    }
  }
}

@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    // left: -250%;

    left: math.div($divWidth, -2);
  }
}
</style>
