import {StyleSheet,Dimensions} from "react-native"
var width = Dimensions.get('window').width; 

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  leftCont:{ 
    width:80
  },
  leftItem:{
    height:80
  },
  rightCont:{
    paddingLeft:10,
    width:width-80,
    flexDirection:"row",
    justifyContent: 'center',
    flexWrap:"wrap"
  },
  rightItem:{
    height:120
  }
});
export default styles
