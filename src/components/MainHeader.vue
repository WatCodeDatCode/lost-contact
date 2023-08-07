<script setup lang="ts">
import logoSrc from "@/assets/logo.svg";
</script>

<template>
  <header>
    <div class="logo-container">
      <img :src="logoSrc" alt="" />
    </div>
    <h1>Lost Luggage Contact</h1>
  </header>
  <p>
    Please fill out the form below and I will get in touch as soon as possible.
  </p>
  <p>Thank you so much!</p>
</template>

<style lang="sass" scoped>
header
    display: flex
    align-items: center

    .logo-container
        width: 100px
        height: auto

        img
            width: 100%
</style>
