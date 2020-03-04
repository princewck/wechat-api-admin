import { 
  fetchList, 
  getById, 
  remove,
  createAccount,
  fetchAccounts,
  getAccountById,
  updateAccount,
  removeAccount,
} from '@/service/selfmedia';
import { createAccounts } from '../../service/selfmedia';

export default {
  name: 'selfmedia',
  state: {
    accounts: {
      list: [],
      pagination: {},
    },
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
      commit('media/merge', {
        detail,
      });
      return detail;
    },
    async 'media/remove' ({ commit, dispatch, state }, { id }) {
      await remove(id);
      await dispatch('media/fetch', { page: state.pagination.current_page });
    },
    async 'media/fetchAccounts' ({ commit, state }, payload) {
      const page = payload && payload.page || 1;
      const data = await fetchAccounts(page);
      commit('media/merge', {
        accounts: {
          ...state.accounts,
          list: data.accounts,
          pagination: data.pagination,
        }
      });
    },
    async 'media/createAccount' ({ dispatch, state }, { payload }) {
      await createAccount(payload);
      dispatch('media/fetchAccounts');
    },
    async 'media/updateAccount' ({ dispatch }, { id, update }) {
      await updateAccount(id, update);
      dispatch('media/fetchAccounts');
    },
    async 'media/getAccountDetail' ({ commit }, { id }) {
      const detail = await getAccountById(id);
      commit('media/merge', {
        accounts: {
          ...state.accounts,
          detail,
        }
      });
    },
    async 'media/removeAccount' ({ dispatch }, { id }) {
      await removeAccount(id);
    }
  }  
}