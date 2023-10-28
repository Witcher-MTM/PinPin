import { Dimensions, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import BetTypeSwitch from "./BetTypeSwitch";
const { width, height } = Dimensions.get('window');
import React from 'react';
export default Bet = () => {
    const [bet, setBet] = React.useState(1)
    const increase = ()=>{
        setBet((prevBet) => parseFloat((prevBet + 0.1).toFixed(1)));
    }
    const decrease = ()=>{
        if(bet>0.1){
            setBet((prevBet) => parseFloat((prevBet - 0.1).toFixed(1)));
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.typeBet}>
                <BetTypeSwitch></BetTypeSwitch>
            </View>
            <View style={styles.betSettings}>
                <View style={styles.sumBet}>
                    <TouchableWithoutFeedback onPress={increase}>
                        <View style={styles.betButton}><Text>+</Text></View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.betAmount}>{bet}</Text>
                    <TouchableWithoutFeedback onPress={decrease}>
                        <View style={styles.betButton}><Text>-</Text></View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.sumBetPatterns}>
                    {/* Додайте зразки суми ставок, якщо потрібно */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        width: width * 0.9,
        height: height * 0.3
    },
    typeBet: {
        backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    betSettings: {
        backgroundColor: "green",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sumBet: {
        backgroundColor: 'orange',
        flexDirection: 'row', // Додайте це, щоб встановити горизонтальне розміщення
        alignItems: 'center',
        justifyContent: 'center',
    },
    betButton: {
        width: 40, // Встановіть необхідний розмір кнопки "+" і "-"
        height: 40,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    betAmount: {
        fontSize: 24, // Встановіть необхідний розмір шрифту
        marginHorizontal: 20, // Додайте бажаний відступ між кнопками і значенням ставки
    },
})
