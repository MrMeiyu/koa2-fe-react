import Cookies from 'js-cookie';
import axios from 'axios';
import { message } from 'antd';

const HOST_API = '/api/';
const RequestMap = {};
/**
 * @description 创建实例
 */
const instance = axios.create({
  baseURL: HOST_API,
  timeout: 10000,
});

/**
 * @description 请求拦截
 */
instance.interceptors.request.use(
  (config) => {
    const key = `${config.method}${config.url}`;
    if (!RequestMap[key] || (RequestMap[key] && RequestMap[key] !== JSON.stringify(config.data))) {
      RequestMap[key] = JSON.stringify(config.data);
      setTimeout(() => {
        delete RequestMap[key];
      }, 500);
    } else {
      const cancelResponse = {
        response: {
          data: {
            data: "",
            message: "你操作的太频繁了，请稍后再试",
          },
        },
      };
      return Promise.reject(cancelResponse);
    }
    const token = Cookies.get('SystemToken');
    if (token) {
      // eslint-disable-next-line
      config.headers.common.Authorization = token;
    }
    return config;
  },
  err => Promise.reject(err)
);

/**
 * @description 响应拦截
 */
instance.interceptors.response.use(
  (response) => {
    const { data, } = response;
    if ([1001, 1004, 1100, ].includes(data.code)) {
      Cookies.remove('SystemToken');
      window.location.href = './#login';
      return Promise.reject(data);
    }
    if (data.code !== 200) {
      message.error(data.message);
      return Promise.reject(data);
    }
    return data;
  },
  (err) => {
    if (!err.response) {
      message.error("系统错误，稍后再试!");
      return Promise.reject(err.response);
    }
    const { code, message: msg, error, } = err.response.data;
    let errorMsg = msg || error;
    if ([1001, 1004, 1100, ].includes(code)) {
      Cookies.remove('SystemToken');
      window.location.href = './#login';
      return Promise.reject(err.response.data);
    }
    if ([500, 503, ].includes(code)) {
      errorMsg = "服务器忙! 请稍后再试。";
    }
    message.error(errorMsg);
    return Promise.reject(err.response.data);
  },
);

export async function Get(url, option = {}) {
  return instance.get(url, { params: option, });
}

export async function Post(url, option = {}) {
  return instance.post(url, option);
}

export async function Delete(url, option = {}) {
  return instance.delete(url, { params: option, });
}
export async function Put(url, option = {}) {
  return instance.put(url, option);
}
export async function Patch(url, option = {}) {
  return instance.patch(url, option);
}

export async function LongTinePost(url, option = {}) {
  return instance.post(url, option, {
    timeout: 1000 * 60 * 60,
  });
}

window.Get = Get;
window.Patch = Patch;
window.Post = Post;
window.LongTinePost = LongTinePost;
window.Put = Put;
window.Delete = Delete;
window.HOST_API = HOST_API;
