import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Platform, StatusBar, ScrollView, TextInput, Button, Alert } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component {
    constructor(props){
      super(props);
      this.state={
        fontsLoaded: false,
        previewImage: "image_1",
        dropdownHeight: 40,
        light_theme:true
      }
    }
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
      this._loadFontsAsync();
    }

    async addPost() {
    if (
      this.state.caption
    ) {
      let postData = {
        preview_image: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        profile_image: this.state.profile_image,
        likes: 0
      };
      await firebase
        .database()
        .ref(
          "/posts/" +
            Math.random()
              .toString(36)
              .slice(2)
        )
        .set(postData)
        .then(function(snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
    } else {
      Alert.alert(
        "Error",
        "All fields are required!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }
    render() {
      if (!this.state.fontsLoaded) {
        return <AppLoading />;
      } else {
      let preview_images = {
        image_1: require("../assets/image_1.jpg"),
        image_2: require("../assets/image_2.jpg"),
        image_3: require("../assets/image_3.jpg"),
        image_4: require("../assets/image_4.jpg"),
        image_5: require("../assets/image_5.jpg"),
        image_6: require("../assets/image_6.jpg"),
        image_7: require("../assets/image_7.jpg"),
      }
        return (
            <View style={this.state.light_theme?styles.containerlight:styles.container}>
              <SafeAreaView style={styles.droidSafeArea}/>
              <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                  <Image 
                    source={require('../assets/logo.png')}
                    style={styles.iconImage}
                  ></Image>
                </View>
                <View style={styles.appTitleTextContainer}>
                  <Text style={this.state.light_theme?styles.appTitleTextlight:styles.appTitleText}>New Posts</Text>
                </View>
              </View>
              <View style={styles.fieldsContainer}>
                <ScrollView>
                  <Image
                    source={preview_images[this.state.previewImage]}
                    style={styles.previewImage}
                  ></Image>
                  <View style={[styles.dropDownSize,{ height: RFValue(this.state.dropdownHeight) }]}>
                    <DropDownPicker
                      items={[
                        { label: "Image 1", value: "image_1" },
                        { label: "Image 2", value: "image_2" },
                        { label: "Image 3", value: "image_3" },
                        { label: "Image 4", value: "image_4" },
                        { label: "Image 5", value: "image_5" },
                        { label: "Image 6", value: "image_6" },
                        { label: "Image 7", value: "image_7" }
                      ]}
                      defaultValue={this.state.previewImage}
                      containerStyle={{
                        height: 40,
                        borderRadius: 20,
                        marginBottom: 10,
                      }}
                      onOpen={() => {
                        this.setState({ dropdownHeight: 170 });
                      }}
                      onClose={() => {
                        this.setState({ dropdownHeight: 40 });
                      }}
                      style={{ backgroundColor: "transparent" }}
                      itemStyle={{
                        justifyContent: "flex-start"
                      }}
                      dropDownStyle={{ backgroundColor: "#2f345d" }}
                      labelStyle={{
                        color: "lightgrey",
                        fontFamily: "Bubblegum-Sans"
                      }}
                      arrowStyle={{
                        color: "lightgrey",
                        fontFamily: "Bubblegum-Sans"
                      }}
                      onChangeItem={item =>
                        this.setState({
                          previewImage: item.value
                        })
                      }
                    />
                  </View>
                  <TextInput
                    style={this.state.light_theme?styles.inputFontlight:styles.inputFont}
                    onChangeText={caption=>this.setState({caption})}  
                    placeholder={"Caption"}
                    placeholderTextColor='lightgrey'
                    numberOfLines={4}
                  />
                  <View style={styles.submitButton}>
                    <Button
                      onPress={() => this.addPost()}
                      title="Submit"
                      color="#841584"
                    />
                </View>
                </ScrollView>
              </View>
              <View style={{ flex: 0.08 }} />
            </View>
        )
      }
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"black",
  },
  containerlight:{
    flex:1,
    backgroundColor:"white",
  },
  droidSafeArea:{
    marginTop: Platform.OS === "andriod" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle:{
    flex:0.07,
    flexDirection:'row',
  },
  appIcon:{
    flex:0.2,
    justifyContent:'center',
    alignItems:'center',
  },
  iconImage:{
    width:"100%",
    height:"100%",
    resizeMode:"contain"
  },
  appTitleTextContainer:{
    flex:0.8,
    justifyContent:'center',
  },
  appTitleText:{
    color:"white",
    fontSize:RFValue(28),
  },
  appTitleTextlight:{
    color:"black",
    fontSize:RFValue(28),
  },
  fieldsContainer:{
    flex:0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont:{
    height:RFValue(40),
    borderColor:'white',
    borderWidth:RFValue(1),
    borderRadius:RFValue(10),
    paddingLeft:RFValue(10),
    color:'white',
    marginTop:20,
  },
  inputFontlight:{
    height:RFValue(40),
    borderColor:'white',
    borderWidth:RFValue(1),
    borderRadius:RFValue(10),
    paddingLeft:RFValue(10),
    color:'black',
    marginTop:20,
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center"
  }
})