
import React, { Component } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import { replaceRoute, replaceOrPushRoute, pushNewRoute } from '../../actions/route';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

class Home extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    replaceOrPushRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>{'Home'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <Grid style={styles.mt}>
            <Row key={'alan'}>
              <View style={styles.row}>
                <Image style={styles.image} source={require('../../../img/9yzlEyv.png')} />
              </View>
            </Row>
            {this.props.list.map((item, i) =>
              <Row key={i}>
                <TouchableOpacity style={styles.row}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            )}
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

function mapStateToProps(state) {
  return {
    list: state.list.list,
  };
}

export default connect(mapStateToProps, bindAction)(Home);
