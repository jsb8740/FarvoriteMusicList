<template>
  <div class="searchingBox">
    <SearchingBoxClose @click="closeSearchBox"></SearchingBoxClose>
    <AppInput
      type="text"
      placeholder="검색"
      v-model="keyWord"
      @keypress.enter="enterKeyEvent"
      ref="cursor"
      @focus.stop.capture
    />

    <Empty
      @click="emptyKeyWord"
      v-show="keyWord.length > 0 ? true : false"
    ></Empty>
  </div>
</template>

<script setup lang="ts">
import SearchingBoxClose from "./icons/searchingBox/SearchingBoxClose.vue";
import Empty from "./icons/searchingBox/Empty.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import AppInput from "./common/AppInput.vue";

const router = useRouter();
const route = useRoute();
const keyWord = ref<string>("");
const cursor = ref<HTMLElement | null>(null);

const store = useSearchStore();
const { searchResult } = storeToRefs(store);

interface Props {
  isSearch: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "close", value: boolean): void;
}
const emit = defineEmits<Emits>();

const closeSearchBox = () => {
  emit("close", !props.isSearch);
};

const emptyKeyWord = () => {
  keyWord.value = "";
};
onMounted(async () => {
  await router.isReady();
  if (route.name === "SearchingResult") {
    keyWord.value = (route.query?.keyword as string | null) ?? "";
  }
  // focusInput();
});

const enterKeyEvent = (event: Event) => {
  if (keyWord.value !== "") {
    // if (route.name === "SearchingResult") {
    //   router.replace({
    //     name: "SearchingResult",
    //     query: {
    //       keyword: keyWord.value,
    //     },
    //   });
    // } else {
    //   router.push({
    //     name: "SearchingResult",
    //     query: {
    //       keyword: keyWord.value,
    //     },
    //   });
    // }
    router.replace({
      name: "SearchingResult",
      query: {
        keyword: keyWord.value,
      },
    });
  }
};

let timer: number;
const test = (event: Event) => {
  keyWord.value = (event.target as HTMLInputElement).value;

  if (timer) {
    clearTimeout(timer);
  }
  // 디바운싱

  if (keyWord.value !== "") {
    timer = window.setTimeout(() => {
      // const params = {
      //   keyword: keyWord.value,
      // };
      // axios.get("/api/search", { params }).then((req) => {
      //   console.log(req.data);
      // });
      console.log(keyWord.value);
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
.searchingBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: $footerColor;
  border-radius: 999px;
  padding: 0.7rem;

  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.19);

  input {
    padding-left: 1rem;
    font-size: 1rem;
    border: none;
    outline: none;
    width: 100%;
  }
}
</style>
