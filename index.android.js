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
    'ya\'ll coming over?',
    'Does brian have pants on?',
    'What is Brian drinking?',
    'You\'re not answering the question',
    'Love it',
    'affagados?',
    'When I go to the bank, I only get $100 in quarters',
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
      utterances: [utterance].concat(this.state.utterances)
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
      actualContainer: {
        flex: 1,
        backgroundColor: this.state.backgroundColor,
      },
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      utteranceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
      <View style={styles.actualContainer}>
        <TouchableHighlight onPress={this.speak}>
          <View>
            <View style={styles.container}>
              <View>
                <Image style={styles.image} source={{uri: 'http://imgur.com/9yzlEyv.png'}} />
                <Text style={styles.saySomething} onPress={this.speak}>
                  Make Alan say something
                </Text>
              </View>
            </View>
            <View style={styles.utteranceContainer}>
              {this.utterances}
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('VirtualAlan', () => VirtualAlan);
