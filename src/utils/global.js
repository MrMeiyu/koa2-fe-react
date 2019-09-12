
/**
 * 路由跳转
 * @param {*} props 需要传入组件的 props
 * @param {*} pathname 跳转路由的地址
 * @param {*} state
 */
export const nav = (props, pathname, state = {}) => {
  console.log(props, 'props')
  const { history, } = props
  history.push({
    pathname,
    state
  })
}

global.nav = nav