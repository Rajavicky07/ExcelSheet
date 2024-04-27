import React from "react";
import { StyleSheet } from "react-native";

const Dash =() =>{
    return(
        <View style ={styles.container}>
            Welcome to Dashboard
        </View>
    )
};
const styles =StyleSheet.create({
    container:{
        justifyContent: "center"
    }
});
export default Dash;