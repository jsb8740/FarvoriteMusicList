import { onBeforeMount, onMounted } from "vue";

export default function usePressSpaceBar(cb: Function) {
  const listener = (e: KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.code === "Space") {
      cb();
    }
  };

  onMounted(() => {
    setTimeout(() => {
      document.addEventListener("keyup", listener, true);
    }, 2000);
  });
  onBeforeMount(() => {
    document.removeEventListener("keyup", listener, true);
  });
}
