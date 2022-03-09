<script setup>
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  AUTH_AUTO_LOGIN_ACTION,
  AUTH_IS_USER_EXIST,
  AUTH_LOGOUT_ACTION,
} from "../store/Constants";
const router = useRouter();
const store = useStore();
store.dispatch(`authStore/${AUTH_AUTO_LOGIN_ACTION}`);
const isUserExist = computed(
  () => store.getters[`authStore/${AUTH_IS_USER_EXIST}`]
);
const logoutFn = () => {
  store.dispatch(`authStore/${AUTH_LOGOUT_ACTION}`);
  router.push("/login");
};
</script>
<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link v-if="!isUserExist" to="/login">Login</router-link>
    <a href="#" v-else @click.prevent="logoutFn">Logout</a>
    <router-link to="/operations">Operations</router-link>
  </nav>
</template>

<style scoped lang="scss">
#nav {
  @include around-flex;
  font-size: 1.4rem;
  margin-top: 20px;
}
</style>
