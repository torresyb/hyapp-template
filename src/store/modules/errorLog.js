/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: 错误日志记录
 */

// mutationsType
const ADD_ERROR_LOG = 'ADD_ERROR_LOG'

// state
const state = {
  logs: []
}

// mutations
const mutations = {
  [ADD_ERROR_LOG] (state, log) {
    state.logs.push(log)
  }
}

// action
const actions = {
  addErrorLog ({commit}, log) {
    commit('ADD_ERROR_LOG', log)
  }
}

const getters = {
  getErrorLog (state) {
    return state.logs
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
