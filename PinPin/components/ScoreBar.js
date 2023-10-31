import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import ScoreBarElements from './ScoreBarElements';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
export default ScoreBar = () => {
    const Score = useSelector((state) => state.score.value);
    const uniqueKeyTracker = {};
  const reversedScore = [...Score].reverse();
  return (
    <View style={styles.container}>
      {reversedScore.map((scoreItem) => {
        if (!uniqueKeyTracker[scoreItem]) {
          uniqueKeyTracker[scoreItem] = true;
          return (
            <View key={scoreItem} style={styles.row}>
              <ScoreBarElements scoreid={`score-${scoreItem}`} text={`${parseFloat(scoreItem).toFixed(2)}x`} />
            </View>
          );
        }
        return null;
      })}
    </View>
  );
  }
  
  

const styles = StyleSheet.create({
    container: {
        paddingLeft:15,
        backgroundColor: '#000000',
        alignItems: 'left',
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
