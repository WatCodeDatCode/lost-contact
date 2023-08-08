import { createRouter, createWebHistory } from "vue-router";
import ContactForm from "@/components/ContactForm.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ContactForm
    }
  ]
});
