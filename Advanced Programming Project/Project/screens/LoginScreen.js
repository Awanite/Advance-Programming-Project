import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';

import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    static navigationOptions = {
        header : null
    };
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}));
    }
    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image source={require('./images/authHeader.png')} 
                style={{marginTop: -230, marginLeft: -40}}></Image>
                <Image source={require('./images/authFooter.png')} 
                style={{position: "absolute", bottom: -325, right: -225}}></Image>
                <Image source={require('./images/loginLogo.png')}
                style={{marginTop: -110,alignSelf:"center"}}></Image>
                <View>
                    <Text style={styles.greeting}>Welcome Back</Text>
                </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>email address</Text>
                        <TextInput style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}>
                        </TextInput>
                    </View>
                    <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>password</Text>
                        <TextInput style={styles.input} 
                        secureTextEntry 
                        autoCapitalize="none"
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}>
                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{color:"white",fontWeight:"500"}}>Sign in</Text>
                    </TouchableOpacity>
                <TouchableOpacity 
                style={{alignSelf:"center", marginTop: 32}}
                onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>
                        New to SocialApp? <Text style={{color:"orange"}}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
        },
    errorMessage: {
        height: 72,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30
    },
    error:{
        color: "red",
        fontSize: 13,
        fontWeight: "600",
        textAlign:"center"
    },
    form: {
        marginBottom: 40,
        marginHorizontal: 30
    },
    inputTitle: {
        fontSize: 12,
        color: "grey",
        textTransform: "uppercase"
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "grey",
        height: 40,
        color: "black"
    },
    button: {
        height: 52,
        borderRadius: 4,
        marginHorizontal: 100,
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center"
    }
});