import Expo, { Asset, Font } from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

const talkingAsset = require('./assets/icons/talking.jpg')
const silentAsset = require('./assets/icons/silent.jpg')

const phrases = [
  {
    slug: '18_minutes',
    words: 'Be there in 18 minutes',
    asset: require('./assets/video/18_minutes.m4a')
  },

  {
    slug: 'answer_question',
    words: 'You\'re not answering the question',
    asset: require('./assets/video/answer_question.m4a')
  },

  {
    slug: 'blue_bottle',
    words: 'Blue bottle!',
    asset: require('./assets/video/blue_bottle.m4a')
  },

  {
    slug: 'brian_drinking',
    words: 'What is Brian drinking?',
    asset: require('./assets/video/brian_drinking.m4a')
  },

  {
    slug: 'brian_pants',
    words: 'Does Brian have pants on?',
    asset: require('./assets/video/brian_pants.m4a')
  },

  {
    slug: 'coffee',
    words: 'Coffee?',
    asset: require('./assets/video/coffee.m4a')
  },

  {
    slug: 'coming_over',
    words: 'Y\'all coming over?',
    asset: require('./assets/video/coming_over.m4a')
  },

  {
    slug: 'hilarious',
    words: 'Hilarious',
    asset: require('./assets/video/hilarious.m4a')
  },

  {
    slug: 'k_great',
    words: 'K great',
    asset: require('./assets/video/k_great.m4a')
  },

  {
    slug: 'love_it',
    words: 'Love it!',
    asset: require('./assets/video/love_it.m4a')
  },

  {
    slug: 'mama',
    words: 'Mama mia, papa pia, baby got the diarrhea!',
    asset: require('./assets/video/mama.m4a')
  },

  {
    slug: 'solving',
    words: 'We\'re not solving for that',
    asset: require('./assets/video/solving.m4a')
  },

  {
    slug: 'sure_why_not',
    words: 'Sure, why not',
    asset: require('./assets/video/sure_why_not.m4a')
  },

  {
    slug: 'swensens',
    words: 'I want Swensens',
    asset: require('./assets/video/swensens.m4a')
  },
  {
    slug: 'tacko',
    words: 'I want Tacko',
    asset: require('./assets/video/tacko.m4a')
  }
]

class App extends React.Component {
  state = {
    ready: false,
    currentPhraseIndex: null,
    pastPhraseIndexes: []
  }

  constructor(props) {
    super(props)

    this.onSpeak = this.onSpeak.bind(this)
    this.onSpeakEnd = this.onSpeakEnd.bind(this)
  }

  async componentWillMount() {
    phrases.forEach(async (phraseObject) => {
      await Asset.fromModule(phraseObject.asset).downloadAsync();
    })
    await Asset.fromModule(talkingAsset).downloadAsync();
    await Asset.fromModule(silentAsset).downloadAsync();

    await Font.loadAsync({
      'shrikhand-regular': require('./assets/fonts/Shrikhand-Regular.ttf'),
    });

    this.setState({
      ready: true
    })
  }

  onSpeak() {
    const lastPhraseIndex = this.state.pastPhraseIndexes[0]
    let randomPhraseIndex = lastPhraseIndex
    while (randomPhraseIndex === lastPhraseIndex) {
      randomPhraseIndex = Math.floor(Math.random() * phrases.length)
    }

    this.setState({
      currentPhraseIndex: randomPhraseIndex,
      pastPhraseIndexes: [randomPhraseIndex].concat(this.state.pastPhraseIndexes)
    })
  }

  onSpeakEnd() {
    this.setState({
      currentPhraseIndex: null,
    })
  }

  render() {
    if (!this.state.ready) {
      return <Expo.AppLoading />;
    }

    const { currentPhraseIndex, pastPhraseIndexes } = this.state
    const imageSource = currentPhraseIndex !== null ? talkingAsset : silentAsset

    return (
      <View style={styles.container}>
        {currentPhraseIndex !== null ? (
          <Expo.Video
            source={phrases[currentPhraseIndex].asset}
            repeat={false}
            style={styles.soundContainer}
            onEnd={this.onSpeakEnd}
          />
        ) : null}

        <TouchableWithoutFeedback onPress={this.onSpeak} style={styles.image}>
          <Image source={imageSource} />
        </TouchableWithoutFeedback>
        <View>
          {pastPhraseIndexes.map((phraseIndex, i) => {
            return (
              <Text key={i} style={styles.pastPhrase}>
                {`"${phrases[phraseIndex].words}"`}
              </Text>
            )
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  soundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  image: {
    width: 300,
    height: 300
  },
  pastPhrase: {
    fontFamily: 'shrikhand-regular',
    fontSize: 24,
    textAlign: 'center'
  }
});

Expo.registerRootComponent(App);