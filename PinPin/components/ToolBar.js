import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default ToolBar = () => {
  const [totalMoney, setTotalMoney] = React.useState(0);
  const tmp = useSelector((state) => state.money.value);

  React.useEffect(() => {
    setTotalMoney(tmp);
  }, [tmp]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Aviator</Text>
      <View style={styles.moneyContainer}>
        <Text style={styles.moneyText}>{parseFloat(totalMoney).toFixed(2)} USD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#1b1c1d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 24,
    color: '#00e808', // Зелений колір для тексту "Aviator"
  },
  moneyContainer: {
    backgroundColor: '#00e808',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  moneyText: {
    fontSize: 18,
    color: '#1b1c1d', // Чорний колір для суми грошей
  },
});
