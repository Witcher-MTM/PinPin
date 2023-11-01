import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useDispatch } from 'react-redux';
import { setisAuto } from '../../modules/ScoreSlice';

const { width, height } = Dimensions.get('window');

const BetTypeSwitch = () => {
  const [selectedType, setSelectedType] = useState('Bet');
  const switchAnimation = new Animated.Value(0);
  const dispatch = useDispatch()
  const switchToBet = () => {
    setSelectedType('Bet');
    dispatch(setisAuto(false))
    animateSwitch(0);
  };

  const switchToAuto = () => {
    setSelectedType('Auto');
    dispatch(setisAuto(true))
    animateSwitch(1);
  };

  const animateSwitch = (toValue) => {
    Animated.timing(switchAnimation, {
      toValue,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={switchToBet}>
        <Text style={[styles.switchText, selectedType === 'Bet' && styles.selected]}>Bet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={switchToAuto}>
        <Text style={[styles.switchText, selectedType === 'Auto' && styles.selected]}>Auto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:"#000000",
    borderRadius:10,
    borderWidth:2,
    paddingHorizontal: 10,
    width:width*0.4
  },
  switchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#878787',
  },
  selected: {
    color: '#FFFFFF',
  },
});

export default BetTypeSwitch;
