import {createStore} from "redux"

const InitState = {
  listData:{title:"list"},
  detailData:{title:"详情页面的 数据 title"}
}
const reudcer = (state=InitState,action)=>{
  switch(action.type){

    case " ":
    return state
    default:
    return state
  }
}

const store = createStore(reudcer)
export default store