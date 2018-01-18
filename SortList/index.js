/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  DeviceEventEmitter,
  FlatList,
  SectionList,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import data from "./listData" //加载数据
import styles from "./style" //加载样式

let listData = data.RspData.data.map(ele=>{
  ele.data = ele.Childs //添加data属性，满足 sectionList的数据需求
  return ele
});

var width = Dimensions.get('window').width; 

//分类列表
class ClassList extends Component{
  list = null;
  //选中的下标
  state={
    activeIndex:0
  }
  leftPress(item,index){
    //触发分类列表的事件
    DeviceEventEmitter.emit("leftEvent",{item,index})

    this.setState({
      activeIndex:index
    })
  }
  render (){
    const {listData} = this.props
    const {activeIndex} = this.state
     return <View style={styles.leftCont}>
        <FlatList
          contentContainerStyle={{width:80}}
          ref={list=>{this.list=list}}
            data={listData}
            renderItem={({item,index}) => (
              <TouchableOpacity
                onPress={()=>this.leftPress(item,index)}
              >
                <View style={[styles.leftItem,{backgroundColor:activeIndex===index?"#ad1":"#fff"}]}>
                  <Text>{item.CategoryName}</Text>
                </View>
              </TouchableOpacity>
            ) }
          />
      </View>
  }
}


export default class App extends Component<{}> {
  static navigationOptions = {
    title: 'list'
  };
  list = null //list 默认值
  constructor(props) {
    super(props);
    
    this.state = {
     listData:[]
    };
  }
  componentDidMount(){
    this.setState({
      listData
    })
    //监听 分类列表的事件 leftEvent 
    this.listener = DeviceEventEmitter.addListener("leftEvent",(params)=>{
      // this.list  是sectionList
      //sectionList 滚动某个位置
        this.list.scrollToLocation({
          itemIndex:0,
          sectionIndex:params.index,
        })
    })
  }
  render() {
    const {listData} = this.state
    return (
      <View style={styles.container}>
        <ClassList listData={listData}></ClassList>
        <SectionList 
          ref={(list)=>{this.list =list }}
          sections={listData}
          contentContainerStyle={styles.rightCont}
          renderSectionHeader={({section}) => <View style={{width:width-100}}><Button title={section.CategoryName} /></View>}

          renderItem={({item})=>(
              <View style={styles.rightItem}>
                <Image source={{uri:item.PictureUrl}} style={{height:80,width:80}}></Image>
                <Text>{item.CategoryName}</Text>
              </View>
          )}
         />
        
      </View>
    );
  }
}
