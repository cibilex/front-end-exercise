<script setup>
import { computed, ref } from "vue";
import {
  AUTH_IS_USER_ADMIN,
  OP_GET_ALL_USERS_ACTION,
} from "../store/Constants";
import store from "../store";
import Table from "../components/Operations/Table.vue";
const isUserAdmin = computed(
  () => store.getters[`authStore/${AUTH_IS_USER_ADMIN}`]
);
await store.dispatch(`opStore/${OP_GET_ALL_USERS_ACTION}`);
const filterVal = ref("");
const filterBy = ref("email");
const filtered = computed(() =>
  store.state.opStore.users.filter(
    (user) =>
      user[filterBy.value]
        .toLowerCase()
        .trim()
        .indexOf(filterVal.value.toLowerCase()) > -1
  )
);
</script>
<template>
  <div style="margin-top: 100px">
    <Table :users="filtered" :is-user-admin="isUserAdmin">
      <div>
        <input type="text" v-model.trim="filterVal" class="form-input" />
        <select
          v-model="filterBy"
          title="Choose what you want to filter  by"
          class="form-input"
          style="margin: 0px 10px"
        >
          <option value="email">Email</option>
          <option value="first_name">first name</option>
          <option value="last_name">last name</option>
        </select>
      </div>
    </Table>
  </div>
</template>
