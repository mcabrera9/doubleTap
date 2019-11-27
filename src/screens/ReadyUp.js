import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import HelpModal from '../components/HelpModal.js'

class ReadyUp extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
   
  constructor(props) {
    super(props);
    this.state = {
      matchup: [0,1],
      timer: 2,
      width: '20%',
      player1ready: false,
      player2ready: false,
    };
  }

  componentDidMount(){
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        console.log('willBlur', payload);
        this.setState({
          matchup: [0,1],
          timer: 2,
          width: '20%',
          player1ready: false,
          player2ready: false,
        });
      }
    );

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        console.debug('willFocus', payload);
        this.setState({matchup: this.props.navigation.getParam('turnOrder',[[0,1]]).pop()})
        const intervalID = setInterval(() => {
        if(this.state.timer >= 1){
          this.setState(prevState => {return { timer: prevState.timer - 1 };});
        }
        if(this.state.timer === 0){
          this.setState({ width: "80%"})
          clearInterval(intervalID);
        }
        }, 1000);
      }
    );
  }

  componentDidUpdate(){
    if(this.state.player1ready && this.state.player2ready){
      this.props.navigation.navigate('RapidTap', {
        activePlayers: this.props.navigation.getParam('activePlayers'),
        matchup: this.state.matchup,
        turnOrder: this.props.navigation.getParam('turnOrder'),
      })
    }
  }

  componentWillUnmount(){
    this.willBlurSubscription.remove();
    this.willFocusSubscription.remove();
  }

  getViewStyle(num){
    let players = this.props.navigation.getParam('activePlayers')
    if(num === 1){
      return {
        flex: 1,
        alignItems: 'center',
        backgroundColor: players[this.state.matchup[0]].color,
      }
    }
    else{
      return{
        flex: 1,
        alignItems: 'center',
        backgroundColor: players[this.state.matchup[1]].color,
        transform: [{ rotate: '180deg'}]
      }
    }
  }

  getPlayerName(num){
    let players = this.props.navigation.getParam('activePlayers')
    if(num === 1){ return players[this.state.matchup[0]].name }
    else{ return players[this.state.matchup[1]].name }
  }

  getGameName = () => {
    const textStyle = {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 32,
      borderColor: 'black',
      borderBottomWidth: 2,
      width: this.state.width
    };
    if(this.state.width==="80%"){
      return (
        <Text style={textStyle}>Rapid Tap!</Text>
      )
    }
    else{
      return <Text style={textStyle}></Text>
    }
  }

  toggleReadyStatus(num){
    if(num === 1 && this.state.timer === 0){
      this.setState(prevState => ({player1ready: !prevState.player1ready }))
    }
    if(num === 2 && this.state.timer === 0){
      this.setState(prevState => ({player2ready: !prevState.player2ready }))
    }
  }

  getHelpButton(num){
    if(this.state.width==="80%"){
      return <HelpModal player={num}/>
    }
  }

  getReadyText(num){
    if(this.state.timer > 0) {return ''}
    else if(num===1){
      if(this.state.player1ready){return 'Ready!'}
      else{return '(Tap to ready up!)'}
    }
    else{
      if(this.state.player2ready){return 'Ready!'}
      else{return '(Tap to ready up!)'}
    }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(2)}>
            <View style={this.getViewStyle(2)}>
              {this.getGameName()}
              {this.getHelpButton(2)}
              <Text style={styles.playerName}>{this.getPlayerName(2)}</Text>
              <Text style={styles.readyText}>{this.getReadyText(2)}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.toggleReadyStatus(1)}>
            <View style={this.getViewStyle(1)}>
              {this.getGameName()}
              {this.getHelpButton(1)}
              <Text style={styles.playerName}>{this.getPlayerName(1)}</Text>
              <Text style={styles.readyText}>{this.getReadyText(1)}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create ({
    playerName: {
      flex: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 52,
    },
    readyText: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 30,
    },
})
export default ReadyUp;