import { fetchList, getById } from '@/service/selfmedia';

export default {
  name: 'selfmedia',
  state: {
    detail: {
      content: ''
    },
    list: [],
    pagination: {
      current_page: 1,
      total_count: 0,
    },
  },
  mutations: {
    'media/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async 'media/fetch' ({ commit }, { page = 1 }) {
      const data = await fetchList(page);
      commit('media/merge', {
        list: data.list,
        pagination: {
          current_page: page,
          total_count: data.total_count,
        }
      });
    },
    async 'media/get' ({ commit }, { id }) {
      const detail = await getById(id);
      console.log('detail', detail);
      commit('media/merge', {
        detail,
      });
      return detail;
    }
  }  
}