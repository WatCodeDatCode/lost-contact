<script setup lang="ts">
import { reactive, computed, watch } from "vue";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  email: boolean;
  message: boolean;
}

const formData: FormData = reactive({ name: "", email: "", message: "" });
const errors: Errors = reactive({ email: false, message: false });

const emailIsValid = computed(() => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(formData.email);
});

const validInputs = () => {
  errors.email = !formData.email || !emailIsValid.value;
  errors.message = !formData.message;
  return errors.email || errors.message ? false : true;
};

const sendMessage = () => {
  const valid = validInputs();
  if (!valid) return;
  alert(valid);
  alert(JSON.stringify(formData));
};

watch(
  () => ({ ...formData }),
  (newVal, oldVal) => {
    console.log({ newVal, oldVal });
    if (newVal.email !== oldVal.email) errors.email = false;
    if (newVal.message !== oldVal.message) errors.message = false;
  }
);
</script>

<template>
  <form novalidate @submit.prevent="sendMessage">
    <div class="form-input-container">
      <input
        v-model="formData.name"
        class="form-input"
        type="text"
        name="name"
        placeholder="Your name"
      />
    </div>
    <div class="form-input-container">
      <input
        v-model="formData.email"
        class="form-input"
        :class="{ error: errors.email }"
        name="email"
        type="email"
        placeholder="Your email address"
      />
      <span v-if="errors.email" class="form-error-message">
        Please enter a
        {{ formData.email && !emailIsValid ? "valid " : "" }}contact email
      </span>
    </div>
    <div class="form-input-container">
      <textarea
        v-model="formData.message"
        class="form-input"
        :class="{ error: errors.message }"
        placeholder="Your message"
        name="message"
      />
      <span v-if="errors.message" class="form-error-message">
        Please enter a message
      </span>
    </div>
    <div class="form-button-container">
      <button class="submit-button" type="submit">Submit</button>
    </div>
  </form>
</template>

<style lang="sass" scoped>
form
  width: 100%
  min-width: 80vw
  display: flex
  flex-direction: column

  > div
    margin-top: 1rem

input, textarea
  width: 100%

.form-input-container
  .form-input
    &.error
      border: 1px solid red

  .form-error-message
    font-size: 0.8rem
    color: red
</style>
