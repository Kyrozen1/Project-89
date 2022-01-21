import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, Platform, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from 'firebase';

export default class PostCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
      is_liked: false,
      likes: this.props.story.value.likes
    };
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render(){
    return(
      <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: this.props.post
            })
          }
        >
      <View style={styles.container}>
        <View style={this.state.light_theme
                ? styles.cardContainerlight:styles.cardContainer}>
          <View style={this.state.light_theme
                ? styles.authorNameContainerlight:styles.authorNameContainer}>
            <Text style={this.state.light_theme
                ? styles.authorNameTextlight:styles.authorNameText}>{this.props.post.author}</Text>
          </View>
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
          </View>
          <Image source={require('../assets/post.jpeg')} style={styles.postImage}/>
          <View style={styles.titleContainer}>
          <View>
            <Text style={this.state.light_theme
                ? styles.captionTextlight:styles.cationText}>{this.props.post.caption}</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={'heart'} size={RFValue(30)} color={"white"} style={{marginTop:18, marginLeft:5, width:40, height:40}}/>
              <Text style={this.state.light_theme?styles.likeTextlight:styles.likeText}>12k</Text>
              </View>
            </View>
          </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerlight:{
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20)
  },
  titleContainer: {
    paddingLeft: RFValue(0),
    justifyContent: "center"
  },
  authorImageContainer:{
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  authorContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  authorNameContainer:{
    flexDirection:'row',
    color:'white',
    marginLeft:20,
  },
  authorNameContainerlight:{
    flexDirection:'row',
    color:'black',
    marginLeft:20,
  },
  authorNameText:{
    fontSize:30,
    color:'white',
  },
  authorNameTextlight:{
    fontSize:30,
    color:'white',
  },
  postImage:{
    marginTop:2,
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(400)
  },
  cationText:{
    fontSize:20,
    color:'white',
    marginTop:5,
    marginLeft:-70,
  },
  captionTextlight:{
    fontSize:20,
    color:'black',
    marginTop:5,
    marginLeft:-70,
  },
  likeText:{
    fontSize:22,
    color:'white',
    marginTop:-2,
    marginLeft:-10
  },
  likeTextlight:{
    fontSize:22,
    color:'black',
    marginTop:-2,
    marginLeft:-10
  },
  likeButton:{
    width: RFValue(190),
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(25),
    marginTop:5,
  }
})