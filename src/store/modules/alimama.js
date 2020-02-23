import { getXPKList, getXPKDetail } from '@/service/alimama';

export default {
  state: {
    xpkList: {
      list: [],
      page: 1,
      total: 0,
    },
    xpkDetail: {
      list: [],
      page: 1,
      total: 0,
      loading: false,
    }
  },
  mutations: {
    'alimama/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async 'alimama/getXPKList' ({commit, state}, payload) {
      const page = payload && payload.page || 1;
      const result = await getXPKList(page);
      commit('alimama/merge', {
        xpkList: {
          list: result.results.tbk_favorites,
          page,
          total: result.total_results,          
        }
      });
    },
    async 'alimama/getXPKDetail' ({commit, state}, { page = 1, favoritesId }) {
      commit('alimama/merge', {
        xpkDetail: {
          list: [],
          loading: true,
          page,
          total: 0,          
        }
      });      
      const result = await getXPKDetail(page, favoritesId);
      console.log('result', result);
      commit('alimama/merge', {
        xpkDetail: {
          list: result.results.uatm_tbk_item,
          page,
          total: result.total_results,     
          loading: false,     
        }
      });
    },
  }
}