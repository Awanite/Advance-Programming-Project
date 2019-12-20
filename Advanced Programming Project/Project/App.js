import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-ionicons';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';

import * as firebase from 'firebase';

var firebaseConfig = {
   apiKey: "AIzaSyBHLup6EphwpRw4p8rDTw2lNgZWXa3JC_M",
   authDomain: "socialapp-4d087.firebaseapp.com",
   databaseURL: "https://socialapp-4d087.firebaseio.com",
   projectId: "socialapp-4d087",
   storageBucket: "socialapp-4d087.appspot.com",
   messagingSenderId: "165043474483",
   appId: "1:165043474483:web:ad5d5c8af4abfd46b0d346"
 };
 // Initialize Firebase
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

 const AppContainer = createStackNavigator(
    {
      default: createBottomTabNavigator(
         {
            Home: {
               screen: HomeScreen,
               navigationOptions: {
                  tabBarIcon: ({tintColor}) => <Icon name="home" size={24} color={tintColor}></Icon>
               }
            },
           Post: {
              screen: PostScreen,
              navigationOptions: {
                 tabBarIcon: ({tintColor}) => <Icon name="add-circle" size={48} color="orange"></Icon>
              }
           }, 
           
           Profile: {
              screen: ProfileScreen,
              navigationOptions: {
                 tabBarIcon: ({tintColor}) => <Icon name="person" size={24} color={tintColor}></Icon>
              }
           }
         },
         {
            defaultNavigationOptions:{
               tabBarOnPress: ({navigation, defaultHandler}) => {
                  if (navigation.state.key === 'Post') {
                     navigation.navigate("postModal");
                  }
                  else {
                     defaultHandler();
                  }
               }
            },
            tabBarOptions:{
              showLabel: false,
              activeTintColor: "black"
            }
         }
      ),
      postModal: {
         screen: PostScreen
      }
    },
    {
       mode: "modal",
       headerMode: "none",
    }
 )


 const AuthStack = createStackNavigator({
   Login: LoginScreen,
   Register: RegisterScreen
   
 });

 export default createAppContainer(
    createSwitchNavigator({
       Loading: LoadingScreen,
       App: AppContainer,
       Auth: AuthStack
    },
    {
       initialRouteName: "Loading"
    })
 );
