import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import SuccessPage from "@/pages/SuccessPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage
    },
    {
      path: "/success",
      component: SuccessPage
    }
  ]
});
