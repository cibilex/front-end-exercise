<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHomeFn = () => router.push("/");
</script>
<template>
  <div>
    <h1>404 | Page Not Found</h1>
    <button class="btn" @click="goHomeFn">Back Home</button>
  </div>
</template>

<style scoped lang="scss">
div {
  margin-top: 100px;
  text-align: center;
  & h1 {
    margin-bottom: 50px;
  }
}
</style>
