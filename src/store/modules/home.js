/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: 用户信息
 */
import {loginHandle} from '../../api/controller/home/index'

// mutationsType
const GET_USER = 'GET_USER'

// state
const state = {
  userInfo: {}
}

// mutations
const mutations = {
  [GET_USER] (state, params) {
    state.userInfo = params
  }
}

// action
const actions = {
  getUserInfoHandle ({commit}) {
    loginHandle().then(rst => {
      commit(GET_USER, rst.data.data)
    })
  }
}

const getters = {
  getUserInfo (state) {
    return state.initNum
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
