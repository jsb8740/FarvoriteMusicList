import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/openplaylist",
      name: "OpenPlayList",
      component: () => import("@/views/OpenPlayListView.vue"),
    },
    {
      path: "/moreplaylist",
      name: "MorePlayList",
      component: () => import("@/views/MorePlayListView.vue"),
    },
    {
      path: "/favoritemusic",
      name: "FavoriteMusic",
      component: () => import("@/views/FavoriteMusicListView.vue"),
    },
    {
      path: "/searchingresult",
      name: "SearchingResult",
      component: () => import("@/views/SearchingResultView.vue"),
    },
  ],
});

export default router;
