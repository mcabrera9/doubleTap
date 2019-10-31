import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class RapidTap extends React.Component {

  static navigationOptions = {
    header: null,
  };
   
  constructor(props) {
    super(props);
    this.state = {
        player1count: 0,
        player2count: 0,
        timer: 5,
        gameStart: false,
        percentage: '100%'};
  }

  componentDidMount(){
    const intervalID = setInterval(() => {
        if(this.state.timer > 0){
          this.setState(prevState => {
              return { timer: prevState.timer - 1 };
          });
          this.setState(prevState => {
              return { percentage: Math.trunc((prevState.timer/5)*100) + "%"};
          });
        }
        else if(this.state.timer === 0){
          this.setState(prevState => {
              return { gameStart: true};
          });
          clearInterval(intervalID);
        }
      }, 1000);
  }

  getProgress(){
    return (
        <View style={{backgroundColor: "black", width: this.state.percentage}}/>
    );
  }

  getTime(){
    if(this.state.timer > 0) {
      return(<Text style={{fontSize: 20, marginLeft: 10}}>{this.state.timer}</Text>);
    }
    else{ return(<View/>);}
  }
  
  incrementCount(number){
    if(number === 1){
      this.setState(prevState => {
        return { player1count: prevState.player1count + 1 };
      });
    }
    else{
      this.setState(prevState => {
        return { player2count: prevState.player2count + 1 };
      });
    }
  }

  getScoreText(number){
    if(number === 1){
      return(
        <View>
          <Text style={{fontSize: 100 + this.state.player1count}}>
            {this.state.player1count}
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text style={{fontSize: 100 + this.state.player2count}}>
            {this.state.player2count}
          </Text>
        </View>
      )
    }
  }

  render() {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.incrementCount(2)}>
            <View style={styles.player2Field}>
                <View>
                    {this.getScoreText(2)}
                </View>
            </View>
          </TouchableHighlight>

          <View style={styles.progressBar}>
            {this.getProgress()}
            {this.getTime()}
          </View>

          <TouchableHighlight style={{flex: 1}} onPress={() => this.incrementCount(1)}>
            <View style={styles.player1Field}>
                <Text>First to 100 wins!</Text>
                <View style={{justifyContent: 'center'}}>
                    {this.getScoreText(1)}
                </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create ({
    player2Field: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'cornflowerblue',
      transform: [{ rotate: '180deg'}]
    },
    player1Field: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'crimson',
    },
    timer:{
      flex: 1,
      fontSize: 20,
    },
    progressBar: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
    },
})
export default RapidTap;