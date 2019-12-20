import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import Icon from 'react-native-ionicons';
import * as firebase from 'firebase';

export default class RegisterScreen extends React.Component{
    static navigationOptions = {
        header : null
    };
    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignup = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName : this.state.name
            });
        }).catch(error => this.setState({errorMessage: error.message}));
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
                <View style={{position:"absolute", top:60, alignItems:"center", width: "100%"}}>
                    <Text style={styles.greeting}>{`Welcome\nSign up to get Started`}</Text>
                    <TouchableOpacity style={styles.avatar}>
                    <Icon name="add" size={40} color="white"></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>name</Text>
                        <TextInput style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}>
                        </TextInput>
                    </View>
                    <View style={{marginTop: 32}}>
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
                <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                        <Text style={{color:"white",fontWeight:"500"}}>Sign up</Text>
                    </TouchableOpacity>
                <TouchableOpacity 
                style={{alignSelf:"center", marginTop: 32}}
                onPress={() => this.props.navigation.navigate("Login")}>
                    <Text>
                        Already have an Account? <Text style={{color:"orange"}}>Sign in</Text>
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
        height: 65,
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
    },
    avatar: {
        width:90,
        height:90,
        borderRadius:45,
        backgroundColor:"#d3d5d4",
        marginTop:10,
        alignItems:"center",
        justifyContent:"center",
        
    }
});