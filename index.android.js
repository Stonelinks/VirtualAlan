/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import tts from 'react-native-android-speech'

const chooseRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const colorGenerator = function() {
  return chooseRandom([
    '#EFD2CB',
    '#C7A27C',
    '#B2EDC5',
    '#D65780',
    '#EE9480',
  ])
};

const chooseSaying = function() {
  return chooseRandom([
    'Sure why not',
    'Be there in 18 minutes',
    'Coffee?',
    'Blue bottle?',
    'I want tacko',
    'I want swensens',
    'Hilarious',
    'We\'re not solving for that',
    'k great',
    'ya\'ll coming over?'
  ])
}

export default class VirtualAlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: colorGenerator(),
      utterances: []
    }
    this.speak = this.speak.bind(this)
  }

  speak() {
    const utterance = chooseSaying()

    this.setState({
      backgroundColor: colorGenerator(),
      utterances: this.state.utterances.concat([utterance])
    })
    tts.speak({
      text: utterance,
      pitch: 0.01,
      forceStop : true ,
      language : 'en'
    }).then(isSpeaking=>{
        // Success Callback
        console.log(isSpeaking);
    }).catch(error=>{
        // Error Callback
        console.log(error)
    });
  }

  get utterances() {

    const styles = this.styles

    return this.state.utterances.map((utterance, i) => {
      return (
        <View key={i}>
          <Text style={styles.utterance}>
            {utterance}
          </Text>
        </View>
      )
    })
  }

  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.state.backgroundColor,
      },
      utteranceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      utterance: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
      },
      saySomething: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      image: {
        width: 300,
        height: 300
      }
    })
  }

  render() {

    const styles = this.styles

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.speak}>
          <View>
            <Image style={styles.image} source={{uri: 'http://imgur.com/9yzlEyv.png'}} />
            <Text style={styles.saySomething} onPress={this.speak}>
              Make Alan say something
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.utteranceContainer}>
          {this.utterances}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('VirtualAlan', () => VirtualAlan);
