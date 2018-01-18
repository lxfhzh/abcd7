import Home from "./Screens/Home"
import Cart from "./Screens/Cart"
import SortList from "./Screens/SortList"
import User from "./Screens/User"
import Detail from "./Screens/Detail"
import React from "react"
import { StackNavigator,TabNavigator  } from "react-navigation"

import {Provider} from "react-redux"
import store from "./store"
//创建tabs
const Tabs = TabNavigator({
  Home:{
    screen:Home
  },
  SortList:{
    screen:SortList,
     //单独设置 sortlist页面的标题
    navigationOptions :{
      title:"分类列表"
    }
  },
  Cart:{
    screen:Cart
  },
  User:{
    screen:User
  }
}, {
  // tabs的样式，配置
  initialRouteName :"SortList",
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      width: 100,    
    },
    style: {
      backgroundColor: 'green',
    }
  },
  //设置每一个页面的标题
  navigationOptions:({navigation})=>({
    title:navigation.state.routeName,
    headerTitleStyle:{alignSelf:'center'}//让标题居中
  })
})



// 创建整个app的路由  
const Navigation  = StackNavigator({
  //嵌套 tabs
  Tabs:{
    screen:Tabs
  },
  //添加详情
  Detail:{
    screen:Detail
  }
})

const App = ()=>{
  return <Provider store={store}>
    <Navigation />
  </Provider>
}
export default App