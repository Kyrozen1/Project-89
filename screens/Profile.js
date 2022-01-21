import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, Switch, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      isEnabled:false,
      profileImage:"",
      name:"",
    };
  }
  toggleSwitch() {
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? "dark" : "light";
    var updates = {};
    updates[
      "/users/" + firebase.auth().currentUser.uid + "/current_theme"
    ] = theme;
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({ isEnabled: !previous_state, light_theme: previous_state });
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async fetchUser(){
    let theme,name,image
    await firebase.database().ref('/users/' + firebase.auth().currentUser.uid)
    .on("value",function(snapshot){
      theme = snapshot.val().currentTheme
      name = `${snapshot}.val().firstName${snapshot}.val().lastName`
      image = snapshot.val().profile.picture
    })
    this.setState({
      light_theme:theme==="light"?true:false,
      isEnabled:theme==="light"?false:true,
      name:name,
      profileImage:image
    })
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={this.state.light_theme?styles.containerlight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon}
            ></Image>
            <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>{`Spectagram`}</Text>
          </View>
          <View>
            <View style={styles.profileImageContainer}>
              <Image source={{uri:this.state.profileImage}} style={styles.profileImage}></Image>
              <Text style={this.state.light_theme?styles.nameTextLight:styles.nameText}>{this.state.name}</Text>
            </View>
            <View style={styles.themeContainer}>
              <Text style={this.state.light_theme?styles.themeTextLight:styles.themeText}>Dark Theme</Text>
              <Switch 
                style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                trackColor={{false:"yellow",true:"green"}} 
                thumbColor={this.state.isEnabled?"grey":"darkblue"} 
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>this.toggleSwitch}
                value={this.state.isEnabled}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white'
  },
  containerlight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#15193c'
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },
  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
  nameTextLight: {
    color: "black",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20)
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  },
  themeTextLight: {
    color: "black",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  }
});
