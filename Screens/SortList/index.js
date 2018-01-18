
import React, { Component } from 'react';
import {connect} from "react-redux"
import {
  Text,
  View,
  Alert,
  Dimensions,
  Image,
  ToastAndroid,
  Button,
  DeviceEventEmitter
} from 'react-native';


const width = Dimensions.get("window").width
const ClassList =(props)=>{

  function emitChangeNumber(){
    DeviceEventEmitter.emit("changeNumber",2)
  }

  return <View>
    <View>
      <Button title="按钮1" onPress={()=>props.changeNumber(1)} />
    </View>
    <View>
      <Button title="按钮2" onPress={emitChangeNumber} />
    </View>
  </View>
}

class SortList extends Component<{}> {
  state = {
    number:10
  }
  componentDidMount() {
     //监听 changeNumber 事件
    this.listener =  DeviceEventEmitter.addListener("changeNumber",(number)=>{
      ToastAndroid.show("changeNumber",2000)
      this.setState({
        number
      })
    })
  }
  componentWillUnmount(){
    //取消监听
    this.listener.remove()
  }
  changeNumber(number){
    this.setState({
      number
    })
  }
  render() {
    //Alert.alert("this.props",JSON.stringify(this.props));
    //this.props.dispatch.toString()
    const {number} = this.state
    return (  
      <View>
        <Text>{number}</Text>
        <ClassList changeNumber={this.changeNumber.bind(this)}></ClassList>
      </View>
    );
  }
}
const mapState = (state)=>{
  return {
    listData:state.listData
  }
}

export default connect(state=>({listData:state.listData}))(SortList)