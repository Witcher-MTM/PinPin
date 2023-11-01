import { Dimensions, StyleSheet, View, Text, TouchableWithoutFeedback, TextInput } from "react-native";
import BetTypeSwitch from "./BetTypeSwitch";
const { width, height } = Dimensions.get('window');
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMoney, setwinValue } from "../../modules/MoneySlice";
import { SaveHistoryWins, saveDataToLocalStorage } from "../../modules/LocalStorage";
import { setValueWhenOut, setisWin } from "../../modules/ScoreSlice";

export default Bet = () => {
    const dispatch = useDispatch()
    const [bet, setBet] = React.useState(1)
    const isEnd = (useSelector((state) => state.score.isEnd))
    const [isSetBet, setIsSetBet] = React.useState(false)
    const [total_money, setTotalMoney] = React.useState(0)
    const Score = (useSelector((state) => state.score.value))
    const tmp_money = useSelector((state) => state.money.value)
    const isAuto = useSelector((state) => state.score.isAuto)
    const [whenCatch, setWhenCatch] = React.useState(1.1)
    const [winout, setWinOut] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const isWin = useSelector((state)=>state.score.isWin)
    const ValuewhenOut = useSelector((state)=>state.score.valueWhenOut)
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
        if (isEnd) {
            setIsSetBet(true)
            console.log("Confirmed bet ", bet)
            console.log("total money", total_money)
        }
    }
    const catchReward = async () => {
        if (isSetBet) {
            var total_win = (parseFloat(total_money) + (parseFloat(bet) * parseFloat(Score))).toFixed(2)
            dispatch(setValueWhenOut(Score))
            console.log("total win:", total_win)
            await dispatch(setMoney(total_win))
            console.log(`${bet}*${Score} = ${parseFloat(bet) * parseFloat(Score).toFixed(2)}`)
            await dispatch(setwinValue((parseFloat(bet) * parseFloat(Score)).toFixed(2)))
            await dispatch(setisWin(true))
            saveDataToLocalStorage({ key: "total_money", data: total_win })
            setIsSetBet(false)
            dispatch(setisWin(true))
            setWinOut(bet*Score)
            setScore(Score)
            return
        }
    }
    const cancelBet = () => {
        setIsSetBet(false)
    }
    const loseMoney = async () => {
        if (isEnd) {
            if (isSetBet) {
                console.log("u lose", bet)
                await dispatch(setisWin(false))
                dispatch(setMoney(parseFloat(total_money) - parseFloat(bet)))
                saveDataToLocalStorage({ key: "total_money", data: (parseFloat(total_money) - parseFloat(bet)).toFixed(2) })
                setIsSetBet(false)
                SaveHistoryWins({
                    key: "history", data: {
                        isWin: false,
                        winout: (bet*-1),
                        score: 0,
                        totalscore: Score
                    }
                })
            }
            if(isWin){
                SaveHistoryWins({
                    key: "history", data: {
                        isWin: true,
                        winout: winout,
                        score: ValuewhenOut,
                        totalscore: Score
                    }
                })
            }
        }
    }
    const AutoCatch = () => {
        if (isAuto) {
            if (isSetBet) {
                if (Score >= whenCatch) {
                    console.log(parseFloat(whenCatch), parseFloat(Score))
                    catchReward()
                }
            }
        }
    }
    React.useEffect(() => {
        AutoCatch(Score)
    }, [Score])
    React.useEffect(() => {
        setTotalMoney(tmp_money)
        loseMoney()
    }, [isEnd])
    return (
        <View style={styles.container}>
            <View style={styles.typeBet}>
                <BetTypeSwitch></BetTypeSwitch>
                {isAuto ? <TextInput
                    style={[styles.input, { color: '#878787' }]}
                    value={whenCatch.toString()}
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9.]/g, '');
                        if (numericText > 100) {
                            setWhenCatch(100);
                        } else {
                            setWhenCatch(numericText)
                        }

                    }}
                    keyboardType="numeric"
                /> : <></>}
            </View>
            <View style={styles.betSettings}>
                <View style={styles.sumBet}>
                    <TouchableWithoutFeedback onPress={decrease}>
                        <View style={styles.betButton}><Text style={styles.betButtonText}>-</Text></View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.betAmount}>{bet}</Text>
                    <TouchableWithoutFeedback onPress={increase}>
                        <View style={styles.betButton}><Text style={styles.betButtonText}>+</Text></View>
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
                                <View style={[styles.yourBetButton, isSetBet && styles.cancelButton]}>
                                    <Text style={styles.yourBetButtonText}>Отмена</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            : <TouchableWithoutFeedback onPress={catchReward}>
                                <View style={styles.yourBetButton}>
                                    <Text style={styles.yourBetButtonText}>Вивести</Text>
                                </View>
                            </TouchableWithoutFeedback>}
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
        backgroundColor: '#1b1c1d',
        borderRadius: 30
    },
    typeBet: {
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
        backgroundColor: '#69ba2f',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#FFFFFF"
    },
    cancelButton: {
        backgroundColor: '#c41616'
    },
    yourBetButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    input: {
        textAlign: 'center',
        backgroundColor: "#000000",
        borderRadius: 10,
        borderWidth: 2,
        paddingHorizontal: 10,
        width: width * 0.4,
        fontSize: 20,
        fontWeight: 'bold',
    },
})
