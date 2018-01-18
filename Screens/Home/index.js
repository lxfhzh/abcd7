
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window")

export default class App extends Component<{}> {
  static navigationOptions = {
    title:"首页",
    headerRight: (
      <Button
        title="消息"
        onPress={() => {Alert.alert("跳转","消息页面")}}
      />)
  }
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      dataSource:ds.cloneWithRows([]), //ds 数据
      listData:[], //后端数据
      refreshing:false 
    }
  }
  
  render() {
    const {listData,refreshing} = this.state
    //用 ds 数据 对后端数据进行包装
    const dataSource = this.state.dataSource.cloneWithRows(listData)
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
          <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          onEndReached={()=>{Alert.alert("提示ss","加载更多",[{text: 'OssssK', onPress: () => console.log('OK Pressed!')}])}}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{
              //下拉刷新，先让刷的loading 显示
              this.setState({
                refreshing:true
              })
              setTimeout(()=>{
                //5秒后，loading隐藏
                this.setState({
                  refreshing:false
                })
              },5000)
            }}
           />}
          renderRow={(rowData)=>{
            return <View style={styles.item}>
              <TouchableOpacity onPress={()=>{
                navigate("Detail",{id:rowData.goodsId,title:rowData.title})
                }}>
                <Image 
                resizeMode="contain" 
                source={{uri:'http://image.loho88.com/'+rowData.img}} style={styles.itemPic}
                />
                <Text>{rowData.title}</Text>
              </TouchableOpacity>
            </View>
          }}
          
          />
       
      </View>
    );
  }
  componentDidMount(){
    //width,height
    Alert.alert("title",width+""+height)
    fetch("http://m.loho88.com/search/?e=222&page=1").then(res=>res.json()).then(data=>{
      this.setState({
        listData:data.result.data
      })
    
    })
  }
}
//css module
const styles = StyleSheet.create({
  list:{
    width:width,
    flexDirection:"row",
    justifyContent: 'center',
    flexWrap:"wrap",
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item:{
    width:width/2,
    height:150
  },
  itemPic:{
    width:width/2,
    height:100
  },
  container: {
    flex: 1,
    flexDirection:"row",
    justifyContent: 'center',
    flexWrap:"wrap",
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
