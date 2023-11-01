import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default ScoreBarElements = ({ text }) => {
  let textColor = 'red';

  if (parseFloat(text) > 2) {
    textColor = 'blue';
  }
  
  if (parseFloat(text) > 5) {
    textColor = 'darkviolet';
  }

  if (parseFloat(text) > 15) {
    textColor = 'purple';
  }

  return (
    <Text style={[styles.text, { color: textColor }]}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 20,
  },
});
