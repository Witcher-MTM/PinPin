import React from 'react';
import { Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import ScoreBarElements from './ScoreBarElements';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default ScoreBar = () => {
  const Score = useSelector((state) => state.score.historyValue);
  const uniqueKeyTracker = {};
  const reversedScore = [...Score].reverse();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {reversedScore.map((scoreItem, index) => {
          if (!uniqueKeyTracker[scoreItem]) {
            uniqueKeyTracker[scoreItem] = true;
            return (
              <View key={index} style={styles.scoreBarElements}>
                <ScoreBarElements scoreid={`score-${scoreItem}`} text={`${parseFloat(scoreItem).toFixed(2)}x`} />
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    width: width,
  },
  scoreBarElements: {
    marginHorizontal: 5,
  },
});
