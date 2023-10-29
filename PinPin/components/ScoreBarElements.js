import React from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet } from "react-native";

export default ScoreBarElements = ({ scoreid, text }) => {
    return( 
        <TouchableWithoutFeedback>
            <Text style={styles.text}>{text}</Text>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    text: {
      margin: 5,
      fontSize: 20,
      color:"#5a007a"
    }
  });