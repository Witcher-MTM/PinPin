import {Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import ToolBar from '../components/ToolBar';
import ScoreBar from '../components/ScoreBar';
import GameWindow from '../components/GameWindow';
const { width, height } = Dimensions.get('window');

export default Main = () => {
  return (
      <SafeAreaView style={styles.container}>
      <ToolBar/>
      <ScoreBar/>
      <GameWindow/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex:1,
        zIndex: 1,
        paddingTop: 44, 
        paddingRight: 15,
        alignContent:"center",
        alignItems:"center"
      },
})