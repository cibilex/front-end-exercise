import {
  AUTH_LOGIN_ACTION,
  AUTH_LOGIN_MUTATION,
  AUTH_IS_USER_EXIST,
  AUTH_AUTO_LOGIN_ACTION,
  AUTH_LOGOUT_ACTION,
  AUTH_LOGOUT_MUTATION,
  AUTH_IS_USER_ADMIN
} from "../Constants";

export default {
  state: {
    email: "",
  },
  getters: {
    [AUTH_IS_USER_EXIST]: (state) => !!state.email,
    [AUTH_IS_USER_ADMIN]:(state)=>state.email=="admin@admin.com"
  },
  mutations: {
    [AUTH_LOGIN_MUTATION]: (state, email) => (state.email = email),
    [AUTH_LOGOUT_MUTATION]:(state)=>state.email=""
  },
  actions: {
    [AUTH_LOGIN_ACTION]:({ commit }, email) =>{
      const validUsers = ["guest@guest.com", "admin@admin.com"];
      if(validUsers.indexOf(email) <= -1) return"Email is wrong"
      commit(AUTH_LOGIN_MUTATION, email)
       localStorage.setItem("email-token",email)
    },
    [AUTH_AUTO_LOGIN_ACTION]:({commit})=>{
      const email=localStorage.getItem("email-token")
      if(email) commit(AUTH_LOGIN_MUTATION, email)
    },
    [AUTH_LOGOUT_ACTION]({commit}){
      localStorage.removeItem("email-token")
      commit(AUTH_LOGOUT_MUTATION)
    }
  },
  namespaced: true,
};
