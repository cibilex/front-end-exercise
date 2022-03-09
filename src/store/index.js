import { createStore } from 'vuex'
import authStore from "./authorization/index"
import opStore from "./operations/index";
export default createStore({
  modules: {
    authStore,
    opStore
  }
})
