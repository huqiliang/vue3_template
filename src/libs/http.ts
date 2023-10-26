import axios from 'axios'
import { Message } from 'view-ui-plus'
import _ from 'lodash-es'

Message.config({
  duration: 3,
})
axios.defaults.timeout = 60000
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(
  (config) => {
    // 这边可根据自己的需求设置headers，我司采用basic基本认证
    const authToken = localStorage.getItem('token')
    if (!_.isEmpty(authToken) && !config.headers.noauth)
      config.headers.Authorization = authToken
    if (config.method === 'get')
      config.data = { unused: 0 } // 解决 get 请求添加不上Content-Type
    config.headers['Content-type'] = 'application/json;charset=UTF-8'
    // 如果有current，就替换成firstResult 请根据实际情况修改
    const params = config.params
    if (params) {
      if (Object.prototype.hasOwnProperty.call(params, 'current')) { // 替换分页形式
        config.params.firstResult = params.current
        delete config.params.current
      }
    }
    return config
  },
  (err) => {
    Message.error({
      content: '请求超时!',
    })
    return Promise.resolve(err)
  },
)
axios.interceptors.response.use(
  (res: any) => {
    const { nomsg } = res.config.headers
    // 接口状态在此修改
    if (res.data.result && res.data.result !== 0) {
      if (!nomsg) {
        Message.error({
          // 接口错误路径
          content: res.data.msg || '未知错误',
        })
      }
    }
    else {
      // pro_iview提醒判断 不可删除 也可以作为接口判断提示
      res.data.success = true
    }
    return res.data
  },
  (err) => {
    const { nomsg } = err.config.headers
    if (!nomsg) {
      if (err.response) {
        if (err.response.status === 504 || err.response.status === 404) {
          Message.error({ content: '服务器被吃了⊙﹏⊙∥' })
        }
        else if (err.response.status === 403) {
          Message.error({ content: '权限不足,请联系管理员!' })
        }
        else {
          Message.error({
            content: `${err.response.status}：${err.response.statusText || err.response.error}`,
          })
        }
      }
      else if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
        Message.error({
          content: '请求超时!',
        })
      }
      else {
        Message.error({ content: err.message || '未知错误!' })
      }
    }
    return Promise.resolve(err)
  },
)

export default { axios }
