import { getXPKList, getXPKDetail } from '@/service/alimama';

export default {
  state: {
    xpkList: [],
    page: 1,
    total: 0,
  },
  mutations: {
    'alimama/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async 'alimama/getXPKList' ({commit}, payload) {
      const page = payload && payload.page || 1;
      const result = await getXPKList(page);
      console.log('result', result);
      commit('alimama/merge', {
        xpkList: result.results.tbk_favorites,
        page,
        total: result.total_results,
      });
    },
  }
}