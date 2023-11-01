import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { getDataFromLocalStorage } from "../modules/LocalStorage";

const { width, height } = Dimensions.get("window");

export default HistoryOfBetElement = ({isWin, score, totalscore, winout, backgroundColor}) => {
  return (
      <View style={styles.row} backgroundColor={backgroundColor}>
        <View style={styles.column}>
          <Text style={styles.header}>{isWin}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>{winout}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>{score}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>{totalscore}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius:10
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
