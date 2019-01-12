import { fetchUsers } from '../../service/customer';
export default {
  state: {
    list: [],
    filters: {
      appName: 'workshop_new'
    },
    pagination: {
      current: 1,
      total_pages: 1,
      count: 0,
    }
  },
  mutations: {
    'customer/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    'customer/fetch'({commit, state}, { page }) {
      const p = page || state.pagination.current;
      return fetchUsers(p, state.filters.appName).then(res => {
        const { success, data, message } = res;
        if (success) {
          return commit('customer/merge', {list: data.list, pagination: {
            count: data.count,
            current: data.current,
            total_pages: data.total_pages,
          }});
        } else {
          return Promise.reject(message);
        }
      })
    },
    async 'customer/changeApp'({ commit, state }, appName) {
      await commit('customer/merge', {filters: {...state.filters, appName}});
    }
  }
}