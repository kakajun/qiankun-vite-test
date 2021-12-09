//主应用的src/action.js
import { initGlobalState } from 'qiankun'
export const initialState = {
  globalLocation: {
    SUID: 60919,
    station: '东湖校区'
  }
}
const actions = initGlobalState(initialState)

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState
}

actions.onGlobalStateChange((newState, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log('main change', JSON.stringify(newState), JSON.stringify(prev));

  for (let key in newState) {
    initialState[key] = newState[key]
  }
});

export default actions
