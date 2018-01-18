
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  Dimensions,
  Image,
  WebView,
  Button
} from 'react-native';
import {connect} from "react-redux"
import { Carousel} from 'antd-mobile';
const width = Dimensions.get("window").width;

class Detail extends Component<{}> {
  static navigationOptions =({navigation})=>(
    {
      title: navigation.state.params.title
    }
  )
  webview= null;
  constructor(props){
    super(props)
    //http://image.loho88.com/
    this.state = {
      pics:[1,2,3],
      cont:""
    }
  }
  toHtml(){
    //调用h5的方法，并且传参
    //this.webview.injectJavaScript("changeH1('hello')")

    //给h5发送消息   （消息必须是字符串）
    this.webview.postMessage("你好  html!")
  }
  render() {
     alert(this.props.detailData.title)
     const {cont,pics} = this.state
     // alert(cont)
     const id = this.props.navigation.state.params.id
    //this.props.navigation.state
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <WebView
            ref={webview => { this.webview = webview; }}
            scalesPageToFit={true}
            source={require("../../html/detail.html")}
            onMessage={(e)=>{
              //监听h5 发送的消息
              Alert.alert("收到html的消息",JSON.stringify(e.nativeEvent.data))
            }}
          ></WebView>
        </View>
        <View  style={{flex:1}}>
          <Button title="调用html" onPress={()=>{this.toHtml()}} />
        </View>
      </View>
    );
  }
  componentDidMount(){
    const id = this.props.navigation.state.params.id
    fetch("http://m.loho88.com/goods/"+id).then(res=>res.json()).then(data=>{
      //data.result
      var pics = data.result.info.pics
      var cont = data.result.txtcontent
      cont = cont.replace(/\ssrc="/g,' sb-src="')
      cont = cont.replace(/(data|vip)-src="/g,'src="http://image.loho88.com')
       cont = cont.replace(/sb-src/g,'width='+width+' sb-src')
      this.setState({
        pics,
        cont
      })
    })
    //获取数据
  }
}

export default connect(state=>({detailData:state.detailData}))(Detail)
//引入线上的页面
        // <WebView
        //   ref={(webview) => { this.webview = webview; }}
        //   scalesPageToFit={true} // 自动缩放页面
        //   source={{uri: "http://m.loho88.com/productions/"+id}} //加载远程的html网页
            //source={{html: cont}} //显示html片段
        //  ></WebView>




     /*<Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {pics.map(val => (
            <View
              key={val}
              style={{width:width,height:width/2,backgroundColor:"#fff" }}
            >
              <Image
                source={{uri:`http://image.loho88.com/${val}`}}
                resizeMode="contain"
                style={{width:width,height:width/2 }}
              />
            </View>
          ))}
        </Carousel>*/