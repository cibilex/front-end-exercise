<script setup>
import { defineProps, ref, watch } from "vue";
import { useStore } from "vuex";
import {
  OP_CREATE_ACTION,
  OP_DELETE_ACTION,
  OP_GET_USER_BY_ID,
  OP_UPDATE_ACTION,
} from "../../store/Constants";
import Spinner from "./Spinner.vue";
import UpdateOrCreate from "./UpdateOrCreate.vue";
import Alert from "./Alert.vue";
const userTemplate = {
  email: "",
  first_name: "",
  last_name: "",
};
const store = useStore();
const loading = ref(false);
const showDialog = ref(false);
const currentUser = ref({ ...userTemplate });
const errMessage = ref("");
const  showAlert=ref(false)
defineProps({
  users: {
    required: true,
    type: Object,
  },
  isUserAdmin: {
    required: true,
    type: Boolean,
  },
});

const updateUserFn = (id) => {
  currentUser.value = store.getters[`opStore/${OP_GET_USER_BY_ID}`](id);
  showDialog.value = true;
};
const startUpdateFn = async (user) => {
  showDialog.value = false;
  loading.value = true;
  try {
    await store.dispatch(`opStore/${OP_UPDATE_ACTION}`, user);
  } catch (err) {
    errMessage.value = err.message;
  }
  currentUser.value = { ...userTemplate };
  loading.value = false;
};
const deleteUserFn = async (id) => {
  let noticeMessage = `Are you sure you want to delete the user. The user will be permanently deleted?`;
  if (confirm(noticeMessage) !== true) return;
  loading.value = true;
  try {
    await store.dispatch(`opStore/${OP_DELETE_ACTION}`, id);
  } catch (err) {
    errMessage.value = err.message;
  }
  loading.value = false;
};
const createUserFn = () => {
  showDialog.value = true;
};
const startCreateFn = async (user) => {
  showDialog.value = false;
  loading.value = true;
  try {
    await store.dispatch(`opStore/${OP_CREATE_ACTION}`, user);
  } catch (err) {
    errMessage.value = err.message;
  }
  currentUser.value = { ...userTemplate };
  loading.value = false;
};
const closeDialogFn = () => {
  showDialog.value = false;
  currentUser.value = { ...userTemplate };
};
watch(errMessage, (to) => {
  if(to=="") return
  showAlert.value=true 
  setTimeout(() =>{
    setTimeout(()=>    (errMessage.value = ""),1200)
    showAlert.value=false
  }, 1500);
});
</script>
<template>
<transition name="dialog">
    <UpdateOrCreate
    @closeDialogFn="closeDialogFn"
    v-if="showDialog"
    :currentUser="currentUser"
    @start-update-fn="startUpdateFn"
    @start-create-Fn="startCreateFn"
  >
  </UpdateOrCreate>
</transition>
  <div class="row-around" id="table-header">
    <button v-if="isUserAdmin" @click="createUserFn" class="btn">Add user</button>
    <!-- filter will put here -->
    <slot></slot>
  </div>
  <table>
    <Spinner v-show="loading"></Spinner>
    <thead>
      <tr>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <template v-if="isUserAdmin">
          <th>Update</th>
          <th>Delete</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.email }}</td>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <template v-if="isUserAdmin">
          <td>
            <button class="btn update-btn" @click="updateUserFn(user.id)">
              update
            </button>
          </td>
          <td>
            <button class="btn delete-btn" @click="deleteUserFn(user.id)">
              delete
            </button>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
  <transition name="alert" :duration="600">
    <Alert
    v-show="showAlert"
    :message="errMessage"
    @close-alert="errMessage = ''"
  ></Alert>
  </transition>
</template>

<style lang="scss">
@include smartTransition($type: dialog,);
@include smartTransition($type: alert,$duration:1);
#table-header {
  margin: 10px 0px;
  .btn {
    color: $blue-medium;
    border-color: $blue-medium;
    background: transparent;
  }
}

table {
  position: relative;
  width: 80%;
  margin: auto;
  text-align: center;
  &,
  td {
    border: 1px solid black;
  }
  td,
  th {
    padding: 15px 4px;
  }
  tr:nth-child(even) {
    background: $blue-regular;
  }
  border-collapse: collapse;
  .update-btn,
  .delete-btn {
    border-radius: 4px;
  }
  .update-btn {
    background: $success-color;
  }
  .delete-btn {
    background: $error-color;
  }
}
</style>
