import {Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import ToolBar from '../components/ToolBar';
import ScoreBar from '../components/ScoreBar';
import GameWindow from '../components/GameWindow';
import Bet from '../components/Bet/Bet';
import React from 'react';

export default Main = () => {
  return (
      <SafeAreaView style={styles.container}>
      <ToolBar/>
      <ScoreBar/>
      <GameWindow/>
      <Bet/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 44, 
        alignContent:"center",
        alignItems:"center",
        backgroundColor:'#000000'
      },
})