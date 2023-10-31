import { Dimensions, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import BetTypeSwitch from "./BetTypeSwitch";
const { width, height } = Dimensions.get('window');
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMoney } from "../../modules/MoneySlice";
import { saveDataToLocalStorage } from "../../modules/LocalStorage";

export default Bet = () => {
    const dispatch = useDispatch()
    const [bet, setBet] = React.useState(1)
    const isEnd = (useSelector((state) => state.score.isEnd))
    const isGameNow = useSelector((state) => state.score.isGameNow)
    const [isSetBet, setIsSetBet] = React.useState(false)
    const [isSetBeforeGame, setIsSetBeforeGame] = React.useState(false)
    const [total_money, setTotalMoney] = React.useState(0)
    const Score = (useSelector((state) => state.score.value))
    const tmp_money = useSelector((state) => state.money.value)
    const increase = () => {
        if (bet >= 100) {
            setBet(100)
        } else {
            setBet((prevBet) => parseFloat((prevBet + 0.1).toFixed(1)));
        }

    }
    const decrease = () => {
        if (bet > 0.1) {
            setBet((prevBet) => parseFloat((prevBet - 0.1).toFixed(1)));
        }
    }
    const updateBet = (amount) => {
        if (bet >= total_money) {
            setBet(total_money)
        }
        if (bet >= 100) {
            setBet(100)
        } else {
            setBet((prevBet) => parseFloat((prevBet + amount).toFixed(1)));
        }
    };
    const confirmBet = () => {
        if (!isEnd) {
            setIsSetBeforeGame(true)
        }
        else {
            setIsSetBet(true)
            console.log("Confirmed bet ", bet)
            console.log("total money", total_money)
        }
    }
    const catchReward = () => {
            if (isSetBet) {
                dispatch(setMoney((parseFloat(total_money) + parseFloat(bet) * parseFloat(Score)).toFixed(2)))
                saveDataToLocalStorage({ key: "total_money", data: total_money})
                setIsSetBet(false)
                return
            } else {
                console.log("u didnt have a bet")
            }
    }
    const cancelBet = ()=>{
        setIsSetBet(false)

    }
    const loseMoney = () => {
        if (isEnd) {
            if (isSetBet) {
                console.log("u lose", bet)
                dispatch(setMoney(parseFloat(total_money) - parseFloat(bet)))
                saveDataToLocalStorage({ key: "total_money", data: (parseFloat(total_money) - parseFloat(bet)).toFixed(2) })
                setIsSetBet(false)
            }
        }
    }
    React.useEffect(() => {
        setTotalMoney(tmp_money)
        loseMoney()
    }, [isEnd])
    return (
        <View style={styles.container}>
            <View style={styles.typeBet}>
                <BetTypeSwitch></BetTypeSwitch>
            </View>
            <View style={styles.betSettings}>
                <View style={styles.sumBet}>
                    <TouchableWithoutFeedback onPress={increase}>
                        <View style={styles.betButton}><Text style={styles.betButtonText}>+</Text></View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.betAmount}>{bet}</Text>
                    <TouchableWithoutFeedback onPress={decrease}>
                        <View style={styles.betButton}><Text style={styles.betButtonText}>-</Text></View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.sumBetPatterns}>
                    <TouchableWithoutFeedback onPress={() => updateBet(1)}>
                        <View style={styles.betPattern}>
                            <Text style={styles.betPatternText}>1</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => updateBet(2)}>
                        <View style={styles.betPattern}>
                            <Text style={styles.betPatternText}>2</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => updateBet(5)}>
                        <View style={styles.betPattern}>
                            <Text style={styles.betPatternText}>5</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => updateBet(10)}>
                        <View style={styles.betPattern}>
                            <Text style={styles.betPatternText}>10</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.yourBet}>
                {isSetBet
                    ?
                    <>
                    {isEnd 
                    ? <TouchableWithoutFeedback onPress={cancelBet}>
                        <View style={styles.yourBetButton}>
                            <Text style={styles.yourBetButtonText}>Отмена</Text>
                        </View>
                    </TouchableWithoutFeedback> 
                    : <TouchableWithoutFeedback onPress={catchReward}>
                        <View style={styles.yourBetButton}>
                            <Text style={styles.yourBetButtonText}>Вивести</Text>
                        </View>
                    </TouchableWithoutFeedback> }
                    </>
                    :
                    <TouchableWithoutFeedback onPress={confirmBet}>
                        <View style={styles.yourBetButton}>
                            <Text style={styles.yourBetButtonText}>Ставка {parseFloat(bet).toFixed(2)}</Text>
                        </View>
                    </TouchableWithoutFeedback>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        height: height * 0.2,
        backgroundColor: '#1b1c1d',
        borderRadius: 30
    },
    typeBet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    betSettings: {
        flex: 1,
    },
    sumBet: {
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        width: width * 0.45,
        height: height * 0.05,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 20,
    },
    betButton: {
        width: width * 0.08,
        height: height * 0.04,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#878787",
        justifyContent: 'center',
        alignItems: 'center',
    },
    betButtonText: {
        color: "#878787",
    },
    betAmount: {
        color: "#FFFFFF",
        width: width * 0.25,
        fontSize: 24,
        marginHorizontal: 0,
        textAlign: "center"
    },
    sumBetPatterns: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: width * 0.5
    },
    betPattern: {
        width: width * 0.2,
        height: height * 0.03,
        borderRadius: 20,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        textAlign: "center",
    },
    betPatternText: {
        color: "#878787",
        fontSize: 15,
    },
    yourBet: {
        marginLeft: 200,
        marginBottom: 10,
    },
    yourBetButton: {
        width: width * 0.45,
        height: height * 0.14,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#FFFFFF"
    },
    yourBetButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
})
