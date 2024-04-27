import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Components/Login";
import Dash from "./Components/Dash";
import Side from "./Components/Side";
import GoogleSheet from "./Task/GoogleSheet";
import ExcelSheet from "./Task/ExcelSheet";

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name="Excel Sheet Data" component={ExcelSheet} />
      {/*
       <Stack.Screen name="viewgs" component={GoogleSheet} options={{headerShown: false}}/>
       <Stack.Screen name="side" component={Side} options={{headerShown: false}}/> 
       <Stack.Screen name="Dash" component={Dash} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;