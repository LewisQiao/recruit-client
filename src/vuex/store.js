//引入vue
import Vue from 'vue'
import Vuex from 'vuex'

//注册vuex
Vue.use(Vuex)

//状态
const state = {
    userinfo: JSON.parse(localStorage.getItem('userinfo'))
}

//mutations 主要操作state
const mutations = {
    //保存用户数据
    SAVE_USERINFO(state, userinfo) {
        console.log('触发函数')
        //先本地存储
        localStorage.setItem('userinfo', JSON.stringify(userinfo))
        //再更新数据
        state.userinfo = userinfo
        console.log("赋值后的", state.userinfo)
    }
}


//创建store库 暴露出去
export default new Vuex.Store({
    state,
    mutations
})
//在mianjs中引入import store from './vuex/store' 并在实例中挂载store
