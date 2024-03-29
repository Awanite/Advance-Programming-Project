import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import * as firebase from 'firebase';
import Fire from '../Fire' ; 

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        })

    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:"white"}}>Loading...</Text>
                <ActivityIndicator size="large" color="white"></ActivityIndicator>
            
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange"
    }
});