import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-ionicons';

import Fire from '../Fire';

const firebase = require("firebase");
require("firebase/firestore");
export default class PostScreen extends React.Component{
    state = {
        text : "",
        image: null
    };

    
    handlePost = () => {
        Fire.shared
            .addPost({ text: this.state.text.trim(), localUri: this.state.image })
            .then(ref => {
                this.setState({ text: "", image: null });
                this.props.navigation.goBack();
            })
            .catch(error => {
                alert(error);
            });
    };

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="black"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "orange",width:50, height: 35, justifyContent:"center", alignItems:"center", borderRadius:4}} onPress={this.handlePost}>
                        <Text style={{fontWeight: "500", color:"white"}}>Post</Text>
                    </TouchableOpacity>
                </View>   
                <View style={styles.inputContainer}>
                    <Image source={require("./images/avatar2.jpg")} style={styles.avatar}></Image>
                    <TextInput autoFocus={true} multiline={true} numberOfLines={4} style={{flex:1, textAlignVertical: "top"}} placeholder="Having any thoughts?" onChangeText={text => this.setState({ text })}
                        value={this.state.text}></TextInput>
                </View>     
                <TouchableOpacity style={styles.photo}>
                    <Icon name="camera" size={32} color="gray"></Icon>
                </TouchableOpacity> 
                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View>  
            </SafeAreaView>
           
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal : 22,
        paddingVertical: 12,
        borderBottomWidth : 1,
        borderBottomColor: "grey"
    },
    inputContainer: {
        margin : 32,
        flexDirection: "row",
        
    },
    avatar : {
        height : 48,
        width : 48,
        borderRadius: 24,
        marginRight : 16
    },
    photo : {
        alignItems : "flex-end",
        marginHorizontal : 32,
        marginTop : -30
    }
  
});