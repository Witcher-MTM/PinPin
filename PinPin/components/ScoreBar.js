import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import ScoreBarElements from './ScoreBarElements';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
export default ScoreBar = () => {
    const Score = useSelector((state) => state.score.value);
    const [uniqueKey, setUniqueKey] = React.useState(0);

  React.useEffect(() => {
    // Кожного разу, коли Score змінюється, змінюємо uniqueKey
    console.log("score",Score,"\n key+1")
    setUniqueKey(uniqueKey + 1);
  }, [Score]);
  return (
    <View style={styles.container}>
      {Score.map((Score) => (
        <View key={uniqueKey} style={styles.row}>
          <ScoreBarElements scoreid={`score-${Score}`} text={parseFloat(Score).toFixed(2)} />
        </View>
      ))}
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
