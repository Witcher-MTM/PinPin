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
            <View style={styles.headerRow}>
                <View style={styles.headerColumn}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
                <View style={styles.headerColumn}>
                    <Text style={styles.headerText}>Win Out</Text>
                </View>
                <View style={styles.headerColumn}>
                    <Text style={styles.headerText}>Score</Text>
                </View>
                <View style={styles.headerColumn}>
                    <Text style={styles.headerText}>Total Score</Text>
                </View>
            </View>
            <FlatList
            style={styles.flatlist}
                data={reversedhistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row} backgroundColor={item.isWin ? "#69ba2f" : "#c41616"}>
                        <View style={styles.column}>
                            <Text style={styles.header}>{item.isWin ? "WIN" : "LOSE"}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.header}>{item.winout}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.header}>{item.score}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.header}>{item.totalscore}</Text>
                        </View>
                    </View>
                )}
            />
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
    headerRow: {
        flexDirection: "row",
        marginTop: 10,
    },
    headerColumn: {
        flex: 1,
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
        borderRadius: 10
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
    flatlist:{
        width:width*0.9
    }
});
