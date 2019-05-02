import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from '@/service/work-product';

export default {
  state: {
    category: {
      list: [],
    },
    product: {
      list: [],
    }
  },
  mutations: {
    'workProduct/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    async 'workProduct/fetchCategories'({ commit, state }) {
      try {
        const categories = await fetchCategories();
        commit('workProduct/merge', {
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
    async 'workProduct/editCategory'({ commit, state }, payload) {
      if (payload.id) {
        await updateCategory(payload);
      } else {
        await addCategory(payload);
      }
    },
    async 'workProduct/deleteCategory'(context, { id }) {
      await deleteCategory(id);
    },
    async 'workProduct/fetchProducts'({ commit, state }) {
      try {
        const product = await fetchProducts();
        commit('workProduct/merge', {
          product: {
            ...state.product,
            list: product,
          }
        });
      } catch (e) {
        console.error(e);
        alert('获取文章失败')
      }
    },
    async 'workProduct/deleteProduct'({commit}, {id}) {
      await deleteProduct(id);
    },
    async 'workProduct/publish'({commit}, thread) {
      if (thread.id) {
        await updateProduct(thread.id, thread);
      } else {
        await createProduct(thread);
      }
    }    
  }
}