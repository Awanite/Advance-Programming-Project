import React from 'react';
import {View, Text, StyleSheet} from 'react-native';



export default class MessageScreen extends React.Component{
  

    render(){
        return(
            <View style={styles.container}>
                <Text>Messages</Text>
               
            </View>
           
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
  
});