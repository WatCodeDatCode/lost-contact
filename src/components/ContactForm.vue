<script setup lang="ts">
import { reactive, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface FormData {
  item: string | null;
  name: string | null;
  email: string;
  message: string;
}

interface Errors {
  email: boolean;
  message: boolean;
}

const formData: FormData = reactive({
  item: null,
  name: null,
  email: "",
  message: ""
});

const errors: Errors = reactive({ email: false, message: false });

const emailIsValid = computed(() => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(formData.email);
});

const validInputs = computed(() => {
  return errors.email || errors.message ? false : true;
});

const route = useRoute();
const router = useRouter();

const sendMessage = () => {
  errors.email = !formData.email || !emailIsValid.value;
  errors.message = !formData.message;
  if (!validInputs.value) return;
  router.push("/success");
};

watch(
  () => ({ ...formData }),
  (newVal, oldVal) => {
    if (newVal.email !== oldVal.email) errors.email = false;
    if (newVal.message !== oldVal.message) errors.message = false;
  }
);

onMounted(async () => {
  await router.isReady();
  formData.item = (route.query.item as string) || null;
});
</script>

<template>
  <form novalidate @submit.prevent="sendMessage">
    <span v-if="!validInputs" class="error-message">
      Please correct the errors below
    </span>
    <div class="form-input-container">
      <input
        v-model="formData.name"
        class="form-input"
        type="text"
        name="name"
        autocomplete="name"
        placeholder="Contact name (optional)"
      />
    </div>
    <div class="form-input-container">
      <input
        v-model="formData.email"
        class="form-input"
        :class="{ error: errors.email }"
        name="email"
        type="email"
        autocomplete="email"
        placeholder="Contact email"
      />
      <span v-if="errors.email" class="error-message">
        Please enter a
        {{ formData.email && !emailIsValid ? "valid " : "" }}contact email
      </span>
    </div>
    <div class="form-input-container">
      <textarea
        v-model="formData.message"
        class="form-input"
        :class="{ error: errors.message }"
        placeholder="Your message regarding what was found where and any further contact info where relevant"
        name="message"
      />
      <span v-if="errors.message" class="error-message">
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
  position: relative
  padding-top: 1.5rem

  > span
    position: absolute
    top: 0
    left: 0

  > div
    margin-bottom: 1rem

input, textarea
  width: 100%

textarea
  height: 100px
  resize: vertical

.form-input-container
  .form-input
    &.error
      border: 1px solid red

.error-message
  font-size: 0.8rem
  color: red
</style>
