<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  message: {
    required: true,
    type: String,
  },
});
defineEmits(["close-alert"]);
</script>
<template>
  <div id="alert" class="row-around">
    <span class="close-btn" @click="$emit('close-alert')">&times;</span>
    <p id="message">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
#alert {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 70px;
  background: $error-color;
  color: red;
  border-radius: 4px;
  .close-btn {
    font-size: 1.2rem;
  }
}
</style>
