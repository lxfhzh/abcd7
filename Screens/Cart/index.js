
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert
} from 'react-native';

export default class Cart extends Component<{}> {
   static navigationOptions = {
    title:"cart"
  }
  render() {
  
    return (
      <View>
        <Text>cart</Text>
      </View>
    );
  }
}
