<script setup>
import { useStore } from "vuex";
import { AUTH_AUTO_LOGIN_ACTION } from "./store/Constants";
import Navbar from "./components/Navbar.vue";
import { onErrorCaptured, ref } from "vue";
const err = ref("");
onErrorCaptured((e) => {
  err.value = e.message;
  return false
});
const store = useStore();
store.dispatch(`authStore/${AUTH_AUTO_LOGIN_ACTION}`);
</script>

<template>
  <Navbar />
  <h1 class="text-center" v-if="err">{{err}}</h1>
  <RouterView v-slot="{ Component }" v-else>
    <template v-if="Component">
      <Suspense>
          <component :is="Component"></component>
        <template #fallback>
          <h1 class="text-center">Loading...</h1>
        </template>
      </Suspense>
    </template>
  </RouterView>
  <!-- <router-view /> -->
</template>

<style lang="scss">
body {
  background: $blue-light;
}
</style>
