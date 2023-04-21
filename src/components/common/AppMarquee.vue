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

<script setup lang="ts">
// props가 필요할듯 list용인지  main용인지
// class도 2개나눠서 list용 -> 글자가 width를 넘어가는 경우 hover시에는 marquee 실행
// 다른 main용 클래스
</script>

<style scoped lang="scss">
@use "sass:math";
$divWidth: 700%;
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

    animation: marquee 10s linear infinite;

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
