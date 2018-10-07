import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,

  fetchThreads,
  deleteThread,
} from '@/service/wish';

export default {
  state: {
    category: {
      list: [],
    },
    thread: {
      list: [],
    }
  },
  mutations: {
    'wish/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async 'wish/fetchCategories'({ commit, state }) {
      try {
        const categories = await fetchCategories();
        commit('wish/merge', {
          category: {
            ...state.category,
            list: categories,
          }
        })
      } catch (e) {
        console.error(e);
        alert('获取分类失败');
      }
    },
    async 'wish/editCategory'({ commit, state }, payload) {
      if (payload.id) {
        await updateCategory(payload);
      } else {
        await addCategory(payload);
      }
    },
    async 'wish/deleteCategory'(context, { id }) {
      await deleteCategory(id);
    },
    async 'wish/fetchThreads'({ commit, state }) {
      try {
        const threads = await fetchThreads();
        commit('wish/merge', {
          thread: {
            ...state.thread,
            list: threads,
          }
        });
      } catch (e) {
        console.error(e);
        alert('获取文章失败')
      }
    },
    async 'wish/deleteThread'({commit}, {id}) {
      await deleteThread(id);
    }
  }
}