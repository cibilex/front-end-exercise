<script setup>
import { defineEmits, defineProps, reactive } from "vue";
const emit = defineEmits([
  "close-dialog-fn",
  "start-update-fn",
  "start-create-fn",
]);
const props = defineProps({
  currentUser: {
    required: true,
    type: Object,
  },
});
const modalType = props.currentUser.email ? "Update" : "Create";
const user = reactive(Object.assign({}, props.currentUser));
const emitUpdateOrAddFn = () => {
  modalType == "Update"
    ? emit("start-update-fn", user)
    : emit("start-create-fn", user);
};
</script>
<template>
  <form class="col-around" id="modal" @submit.prevent="emitUpdateOrAddFn">
    <div class="modal-content col-around">
      <span class="close-btn" @click="$emit('close-dialog-fn')">&times;</span>
      <h2>{{ modalType }} User</h2>
      <label for="email" class="row-between"
        >Email :
        <input
          type="email"
          v-model="user.email"
          class="form-input"
          id="email"
          required
      /></label>
      <label for="first_name" class="row-between"
        >First name :
        <input
          type="text"
          v-model="user.first_name"
          class="form-input"
          id="first_name"
          required
      /></label>
      <label for="last_name" class="row-between">
        Last name:
        <input
          type="text"
          v-model="user.last_name"
          class="form-input"
          id="last_name"
          required
      /></label>
      <input type="submit" :value="modalType" class="btn" />
    </div>
  </form>
</template>

<style scoped lang="scss">
#modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  .modal-content {
    background-color: #fefefe;
    gap: 20px;
    padding: 20px 0;
    border: 1px solid #888;
    position: relative;
    min-width: 50%;
    border-radius: 10px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
    .row-between {
      flex-wrap: wrap;
      width: 60%;
    }
  }
}
</style>
