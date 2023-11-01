import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, FlatList } from "react-native";
import HistoryOfBetElement from "./HistoryOfBetElement";
import { getDataFromLocalStorage } from "../modules/LocalStorage";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export default function HistoryOfBet() {
    const [history, setHistory] = useState([]);
    const reversedhistory = [...history].reverse();
    const isEnd = useSelector((state) => state.score.isEnd);
    const updateHistory = async () => {
        const historyData = await getDataFromLocalStorage("history");

        if (historyData) {
            try {
                const parsedHistory = JSON.parse(historyData);
                await setHistory(parsedHistory);
            } catch (error) {
                console.error("Помилка розпакування історії: ", error);
            }
        }
    };

    useEffect(() => {
        updateHistory();
    }, [isEnd]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.header}>Status</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>Win Out</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>Score</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>Total Score</Text>
                </View>
            </View>
            {reversedhistory.map((item, index) => (
                <HistoryOfBetElement
                    key={index}
                    isWin={item.isWin?"Win":"Lose"}
                    winout={parseFloat(item.winout).toFixed(2)}
                    score={item.score}
                    totalscore={item.totalscore}
                    backgroundColor= {item.isWin?"#69ba2f":"#c41616"}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.95,
        height: height * 0.3,
        borderWidth: 2,
        borderColor: "#5c5c5c",
        backgroundColor: "#171717",
        borderRadius: 20,
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
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
