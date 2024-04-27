import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from "axios";

const Login = () => {

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onclickHandlerLogin = () => {
    
    let errors = {};

    if (!userName) errors.userName = 'Username is required';
    if (!password) errors.password = 'Password is required';

    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = async () => {
    onclickHandlerLogin()
    try {
      const response = await axios.post('http://192.168.0.104:2002/testpath/Loginemp', {
        userName: userName,
        password: password,
      });

      const data = response.data; 
      console.log("Response:", data);
      if (data.success) { 
        console.log("Login successful:", data.message);
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

    return (
      <View style={styles.container}>
     
      <View style={styles.Form}>
        <Text style={styles.label}>Username </Text>
        <TextInput 
           style={styles.input}
           placeholder='Enter your Username'
           value={userName}
           onChangeText={text =>setUsername(text)}
            />
       {errors.userName ? <Text style={styles.errors}>{errors.userName}</Text> : null}
      
        <Text style={styles.label}>Password</Text>
          <TextInput 
           style={styles.input}
           placeholder='Enter your Password'
           value={password}
           onChangeText={text =>setPassword(text)}
           secureTextEntry
           />
           {errors.password ? (<Text style={styles.errors}>{errors.password}</Text>) : null}
           <Button title='Login'
            onPress={handleSubmit}
            color={"#00072D"}
           />
       </View>
    
       </View>
         );
  };

  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
      Form: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        marginLeft:20,
        marginRight:20,
        marginTop:150
      },
      label: {
        fontSize:16,
        marginBottom: 5,
        fontWeight:"bold"
      },
      input:{
        height:40,
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5
      },
      errors:{
        color: 'red',
        marginBottom: 10
      }
  });

export default Login;