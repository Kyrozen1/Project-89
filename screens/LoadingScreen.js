import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component{
  
  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('DashBoardScreen')
      }else{
        this.props.navigation.navigate('LoginScreen')
      }
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})