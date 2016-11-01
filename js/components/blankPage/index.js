
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import styles from './styles';

class BlankPage extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  popRoute() {
    this.props.popRoute();
  }

  render() {
    const { props: { index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{'Wow, great job'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <Text>
            {'VirtualAlan IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.'}
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: () => dispatch(popRoute()),
  };
}

function mapStateToProps(state) {
  return {
    index: state.list.selectedIndex,
    list: state.list.list,
  };
}

export default connect(mapStateToProps, bindAction)(BlankPage);
