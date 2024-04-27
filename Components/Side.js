import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

function Side() {

  return (
    <ImageBackground  source={require("D:/ReactNative/praticeFileRN/assets/pen.avif")}>
   
</ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullscreenBG: {
    flex: 1,
    resizeMode: 'cover' 
  },
      });

export default Side;
