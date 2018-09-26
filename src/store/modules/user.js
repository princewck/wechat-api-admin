import { register, login, logout } from '@/service/user';
const token = loadToken();
const info = loadInfo();

export default {
  state: {
    token,
    info,
    register: {
      errors: '',
    },
    login: {
      errors: ''
    }
  },
  mutations: {
    'user/merge'(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    login({commit, state}, {data}) {
      return login(data).then(res => {
        const { success, message, token, info } = res;
        if (success) {
          commit('user/merge', {token, info});
          updateToken(token);
          updateInfo(info);
        } else {
          commit('user/merge', {login: {errors: message}});
          setTimeout(() => {
            commit('user/merge', {login: {errors: ''}});
          }, 100);          
        }
      })
    },
    logout({state, commit}) {
      logout().then(res => {
        const {success} = res;
        if (success) {
          updateInfo({});
          updateToken('');
          commit('user/merge', {token: null, info: {}});
        };
      });
    },
    register({state, commit}, { data }) {
      return register(data).then(res => {
        const { success, message, token, info } = res;
        if (success) {
          commit('user/merge', {token, info});
          updateToken(token);
          updateInfo(info);
        } else {
          commit('user/merge', {register: {errors: message}});
          setTimeout(() => {
            commit('user/merge', {register: {errors: ''}});
          }, 100);
        }
      });
    },
    'user/resetRegister'(state) {
      state.register.errors = '';
    }
  }
}

function loadToken() {
  return localStorage.getItem('w-session');
}

function loadInfo() {
  const data = localStorage.getItem('userInfo');
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

function updateToken(token) {
  localStorage.setItem('w-session', token);
}

function updateInfo(info) {
  localStorage.setItem('userInfo', JSON.stringify(info))
}