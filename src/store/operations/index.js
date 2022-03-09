import myAxios from "../../boot/myAxios"
import { OP_GET_ALL_USERS_ACTION,OP_ADD_USERS_MUTATION,OP_CREATE_ACTION,OP_CREATE_MUTATION,OP_DELETE_ACTION, OP_DELETE_MUTATION, OP_GET_USER_BY_ID, OP_UPDATE_ACTION, OP_UPDATE_MUTATION} from "../Constants"
export default{
    state:{
        users:[]
    },
    getters:{
        [OP_GET_USER_BY_ID]:state=>id=>state.users.find(user=>user.id===id)
    },
    mutations:{
        [OP_ADD_USERS_MUTATION](state,users){
            state.users=users
        },
        [OP_DELETE_MUTATION](state,id){
           const index=state.users.findIndex(user=>user.id==id)
           state.users.splice(index,1)
        },
        [OP_UPDATE_MUTATION]:(state,data)=>{
            const index=state.users.findIndex(user=>user.id==data.id)
            state.users[index]=data
        },
        [OP_CREATE_MUTATION]:(state,data)=>state.users.push(data)
    },
    actions:{
        [OP_GET_ALL_USERS_ACTION]:async({commit})=>{
        const   res=await myAxios("/api/users")
        if(res.status!==200) throw new Error("something went wrong.Please try again later")
        commit(OP_ADD_USERS_MUTATION,res.data.data)
        },
        [OP_DELETE_ACTION]:async({commit},id)=>{
            const res=await   myAxios.delete(`/api/users/${id}`)
            if(res.status!==204) throw new Error("something went wrong.Please try again later")
            commit(OP_DELETE_MUTATION,id)
        },
        [OP_UPDATE_ACTION]:async({commit},payload)=>{   
            const res=await myAxios.put(`/api/users/${payload.id}`,payload)
            if(res.status!==200) throw new Error("something went wrong.Please try again later")
            commit(OP_UPDATE_MUTATION,res.data)
        },
        [OP_CREATE_ACTION]:async({commit},payload)=>{
            const res=await myAxios.post("api/users",payload)
            if(res.status!==201) throw new Error("something went wrong.Please try again later")
            commit(OP_CREATE_MUTATION,res.data)
        }
    },
    namespaced:true
}    