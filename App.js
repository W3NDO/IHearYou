/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
// import {Node} from 'react';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




  function ChangeColor(color){
    Tts.setDefaultLanguage('en-IE');
    console.log(color)
    if (color === 'red'){
     
      return {
        backgroundColor: '#ff0000',
        height: deviceHeight,
      }
    } else if (color === 'blue') {
      return {
        backgroundColor: '#0000ff',
        height: deviceHeight,
      }
    } else {
      return {
        backgroundColor: '#efef0f',
        height: deviceHeight,
      }
    }
    
  }
  const deviceHeight = Dimensions.get("screen").height;
const App: () => Node = () => {
  const [color, setColor] = useState('')

  const  buttonClick = async () =>{
    try{
      var spokenText = await SpeechAndroid.startSpeech("SAY THE COLOR YOU WANT", SpeechAndroid.DEFAULT);
      ToastAndroid.show(`Heard: ${spokenText}` , ToastAndroid.LONG);
      console.log("RECOGNIZED WORDS: ", spokenText);
      setColor(spokenText)
      if (spokenText == 'red' || spokenText == 'read' || spokenText == 'blue' ){
        Tts.speak(`Here is a ${spokenText} screen`);
      } else {
        Tts.speak('What you said, is not a valid option');
      }
      return (spokenText)
    }catch(error){
      switch(error){
          case SpeechAndroid.E_VOICE_CANCELLED:
              ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
              break;
          case SpeechAndroid.E_NO_MATCH:
              ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
              break;
          case SpeechAndroid.E_SERVER_ERROR:
              ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
              break;
      }
    }
  }
  useEffect(() => {
    ChangeColor(color);
   }, []);
  

  return (
    <SafeAreaView>
        <View
          style={(color == '') ? {backgroundColor: '#efef0f', height: deviceHeight} : ChangeColor(color)}>
          <Text style={styles.text2}> TAP ON THE MICROPHONE ICON </Text>
          {console.log(color)}
          <TouchableOpacity 
          title="LISTEN"
          onPress={ () => buttonClick() }
          style={styles.btn}
          >
            <Image  
              style = {styles.img}
              source = {require('C:/Users/W3NDO/Desktop/School/2021/UI_Arch/IHearYou/mic.png')}
            />
            {
            //<Text style={styles.text}> LISTEN </Text>
            }
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgRed: {
    backgroundColor: '#ff0000',
    height: deviceHeight,
  },
  bgBlue: {
    backgroundColor: '#0000ff',
    height: deviceHeight,
  },
  bgDefault: {
    backgroundColor: '#efef0f',
    height: deviceHeight,
  },
  btn:{
    marginTop: 350,
    alignItems: 'center'
  },
  text:{
    backgroundColor: '#484848',
    color: 'white',
    padding: 30,
    borderRadius: 60,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text2: {
    color: 'white',
    padding: 15,
    borderRadius: 60,
    backgroundColor: '#484848',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: (Dimensions.get("screen").width -100 ),
    marginLeft: 50,
    marginTop: 15,
  },
  img : {
    width: 50,
    height: 50,
  }
});

export default App;
