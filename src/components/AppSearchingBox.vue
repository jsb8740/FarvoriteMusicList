<template>
  <div class="searchingBox">
    <Search></Search>

    <!-- input은 이벤트 버블링인가 그걸 막아야할듯 -->
    <!-- transition 애니메이션 넣기 -->
    <AppInput
      type="text"
      placeholder="Search"
      v-model="keyWord"
      @keypress.enter="enterKeyEvent"
    />

    <Remove @click="closeSearchBox" class="remove"></Remove>
  </div>
</template>

<script setup lang="ts">
import Search from "./icons/Search.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import AppInput from "./common/AppInput.vue";
import Remove from "./icons/Remove.vue";

const router = useRouter();
const route = useRoute();
const keyWord = ref<string>("");

const store = useSearchStore();
const { searchResult } = storeToRefs(store);

export interface Props {
  isSearch: boolean;
}
const props = defineProps<Props>();

export interface Emits {
  (e: "close", value: boolean): void;
}
const emit = defineEmits<Emits>();

const closeSearchBox = () => {
  emit("close", !props.isSearch);
};

onMounted(async () => {
  await router.isReady();
  if (route.name === "SearchingResult") {
    keyWord.value = (route.query?.keyword as string | null) ?? "";
  }
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

let timer: number | undefined;
const test = (event: Event) => {
  keyWord.value = (event.target as HTMLInputElement).value;

  if (timer) {
    clearTimeout(timer);
  }
  // 디바운싱

  if (keyWord.value !== "") {
    timer = setTimeout(() => {
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
  background-color: white;
  border-radius: 999px;
  padding: 0.7rem;

  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.19);

  .remove {
    cursor: pointer;
  }
  input {
    padding-left: 1rem;
    font-size: 1rem;
    border: none;
    outline: none;
    width: 100%;

    &:focus {
    }
  }
}
</style>
