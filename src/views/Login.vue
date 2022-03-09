<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { validateEmail } from "../composables/Validations";
import { AUTH_LOGIN_ACTION } from "../store/Constants";

const email = ref("");
const err = ref("");
const store = useStore();
const router = useRouter();

const loginFn = async () => {
  err.value = "";
  const errMessage = validateEmail(email.value);
  if (errMessage) return (err.value = errMessage);
  const loginError = await store.dispatch(
    `authStore/${AUTH_LOGIN_ACTION}`,
    email.value
  );
  loginError ? (err.value = loginError) : router.push("/operations");
};
</script>
<template>
  <form class="col-around" @submit.prevent="loginFn">
    <h1>Login</h1>
    <input
      type="text"
      autocomplete="email"
      class="form-input"
      placeholder="Enter an email..."
      v-model="email"
    />
    <input type="submit" value="Login" class="btn" />
    <span v-if="err" class="err-message"> {{ err }}</span>
  </form>
</template>

<style scoped lang="scss">
.col-around {
  margin-top: 100px;
}
</style>
