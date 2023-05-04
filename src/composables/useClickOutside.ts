import { onBeforeMount, onMounted, type Ref } from "vue";

export default function useClickOutside<T = unknown>(
  element: Ref<T>,
  cb: Function
) {
  if (!element) return;

  const listener = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const el = element.value as unknown as EventTarget;

    if (e.target !== el && e.composedPath().includes(el)) {
      return;
    }
    if (typeof cb === "function") {
      cb();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });
  onBeforeMount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}
