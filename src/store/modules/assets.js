import { fetch, create, remove, update } from '@/service/assets';

export default {
  state: {
    list: [],
  },
  mutations: {
    'assets/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async 'assets/fetch' ({commit}, type) {
      const list = await fetch(type);
      await commit('assets/merge', {list});
    },
    async 'assets/create' ({dispatch}, {name, type, url, description=''}) {
      await create({name, type, description, url});
      await dispatch('assets/fetch');
    },
    async 'assets/delete' ({commit, state}, {id}) {
      await remove(id);
      await commit('assets/merge', {
        list: state.list.filter(item => item.id != id),
      })
    },
    async 'assets/update' ({commit, state}, {id, name, description, type}) {
      await update(id, {name, description, type});
      await commit('assets/merge', {
        list: state.list.map(item => {
          if (item.id === id) {
            return {...item, name, description, type, updated_at: new Date()};
          }
          return item;
        })
      })
    }
  }
}