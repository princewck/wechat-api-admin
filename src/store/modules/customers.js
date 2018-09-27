import { fetchUsers } from '../../service/customer';
export default {
  state: {
    list: [],
  },
  mutations: {
    'customer/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    'customer/fetch'({commit}) {
      return fetchUsers().then(res => {
        console.log(res);
        const { success, data, message } = res;
        if (success) {
          return commit('customer/merge', {list: data});
        } else {
          return Promise.reject(message);
        }
      })
    }
  }
}