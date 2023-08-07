<script setup lang="ts">
import { reactive, watch } from "vue";

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

const validInputs = () => {
  errors.email = !formData.email;
  errors.message = !formData.message;
  return errors.email || errors.message ? false : true;
};

const sendMessage = () => {
  const valid = validInputs();
  if (!valid) return;
  alert(valid);
  alert(JSON.stringify(formData));
};

watch(formData, (value) => {
  if (value.email) errors.email = false;
  if (value.message) errors.message = false;
});
</script>

<template>
  <form @submit.prevent="sendMessage">
    <div class="form-input">
      <input
        class="form-input"
        type="text"
        name="name"
        placeholder="Your name"
        v-model="formData.name"
      />
    </div>
    <div class="form-input">
      <input
        class="form-input"
        name="email"
        type="email"
        placeholder="Your email address"
        v-model="formData.email"
      />
      <p v-if="errors.email" class="form-error-message">
        Please enter a valid email
      </p>
    </div>
    <div class="form-input">
      <textarea
        name="message"
        placeholder="Your message"
        v-model="formData.message"
      />
      <p v-if="errors.message" class="form-error-message">
        Please enter a message
      </p>
    </div>
    <div class="form-button-container">
      <button class="submit-button" type="submit">Submit</button>
    </div>
  </form>
</template>

<style lang="sass" scoped></style>