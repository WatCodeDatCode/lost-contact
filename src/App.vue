<script setup lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
</script>

<template>
  <MainHeader />
  <router-view></router-view>
  <MainFooter />
</template>

<style lang="sass" scoped></style>
