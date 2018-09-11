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
    loginHandle({name: 'torres', pwd: '1212'}).then(rst => {
      console.log(rst)
      commit(GET_USER, rst)
    })
  }
}

const getters = {
  getUserInfo (state) {
    return state.userInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
