import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 1000,  
})

function getToken() {
  return localStorage.getItem('w-session') || '';
}

function mergeDefaults(options) {
  const defaults = {
    method: 'get',
    headers: {
      'w-session': getToken(),
    },
  };
  const { method, headers, ...others } = options;
  return {
    method: method || defaults.method,
    headers: {
      ...defaults.headers,
      ...headers,
    },
    ...others
  }
}

function request (options) {
  return axiosInstance
    .request(mergeDefaults(options))
    .then(res => res.data);
}

export default request;
