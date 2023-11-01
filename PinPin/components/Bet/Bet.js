import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMoney, setwinValue } from '../../modules/MoneySlice';
import { SaveHistoryWins, saveDataToLocalStorage } from '../../modules/LocalStorage';
import { setValueWhenOut, setisWin } from '../../modules/ScoreSlice';
import BetTypeSwitch from './BetTypeSwitch';

const { width, height } = Dimensions.get('window');

const Bet = () => {
  const dispatch = useDispatch();
  const [bet, setBet] = useState(1);
  const [isSetBet, setIsSetBet] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [whenCatch, setWhenCatch] = useState(1.1);
  const [winout, setWinOut] = useState(0);
  const [score, setScore] = useState(0);

  const isEnd = useSelector((state) => state.score.isEnd);
  const Score = useSelector((state) => state.score.value);
  const tmpMoney = useSelector((state) => state.money.value);
  const isAuto = useSelector((state) => state.score.isAuto);
  const isWin = useSelector((state) => state.score.isWin);
  const valueWhenOut = useSelector((state) => state.score.valueWhenOut);

  const increase = () => {
    const newBet = bet + 0.1 > 100 ? 100 : parseFloat((bet + 0.1).toFixed(1));
    setBet(newBet);
  };

  const decrease = () => {
    if (bet > 0.1) {
      setBet(parseFloat((bet - 0.1).toFixed(1)));
    }
  };

  const updateBet = (amount) => {
    const newBet = bet + amount > totalMoney ? totalMoney : bet + amount;
    setBet(parseFloat(newBet.toFixed(1)));
  };

  const confirmBet = () => {
    if (isEnd) {
      setIsSetBet(true);
      console.log("Confirmed bet ", bet);
      console.log("total money", totalMoney);
    }
  };

  const catchReward = async () => {
    if (isSetBet) {
      const totalWin = (totalMoney + bet * Score).toFixed(2);
      dispatch(setValueWhenOut(Score));
      console.log("total win:", totalWin);
      await dispatch(setMoney(totalWin));
      await dispatch(setwinValue(parseFloat(bet * Score).toFixed(2)));
      await dispatch(setisWin(true));
      saveDataToLocalStorage({ key: "total_money", data: totalWin });
      setIsSetBet(false);
      dispatch(setisWin(true));
      setWinOut(bet * Score);
      setScore(Score);
      return;
    }
  };

  const cancelBet = () => {
    setIsSetBet(false);
  };

  const loseMoney = async () => {
    if (isEnd) {
      if (isSetBet) {
        console.log("You lose", bet);
        await dispatch(setisWin(false));
        const newTotalMoney = totalMoney - bet;
        dispatch(setMoney(newTotalMoney));
        saveDataToLocalStorage({ key: "total_money", data: newTotalMoney.toFixed(2) });
        setIsSetBet(false);
        SaveHistoryWins({
          key: "history",
          data: {
            isWin: false,
            winout: -parseFloat(bet).toFixed(2),
            score: 0,
            totalscore: Score,
          },
        });
      }
      if (isWin) {
        SaveHistoryWins({
          key: "history",
          data: {
            isWin: true,
            winout: parseFloat(winout).toFixed(2),
            score: valueWhenOut,
            totalscore: Score,
          },
        });
      }
    }
  };

  const AutoCatch = () => {
    if (isAuto && isSetBet && Score >= whenCatch) {
      catchReward();
    }
  };

  useEffect(() => {
    AutoCatch();
  }, [Score]);

  useEffect(() => {
    setTotalMoney(tmpMoney);
    loseMoney();
  }, [isEnd]);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <View style={styles.typeBet}>
        <BetTypeSwitch />
        {isAuto ? (
          <TextInput
            style={[styles.input, { color: '#878787' }]}
            value={whenCatch.toString()}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9.]/g, '');
              const newWhenCatch = numericText > 100 ? 100 : numericText;
              setWhenCatch(newWhenCatch);
            }}
            keyboardType="numeric"
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.betSettings}>
        <View style={styles.sumBet}>
          <TouchableWithoutFeedback onPress={decrease}>
            <View style={styles.betButton}>
              <Text style={styles.betButtonText}>-</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.betAmount}>{bet}</Text>
          <TouchableWithoutFeedback onPress={increase}>
            <View style={styles.betButton}>
              <Text style={styles.betButtonText}>+</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.sumBetPatterns}>
          {[1, 2, 5, 10].map((pattern) => (
            <TouchableWithoutFeedback key={pattern} onPress={() => updateBet(pattern)}>
              <View style={styles.betPattern}>
                <Text style={styles.betPatternText}>{pattern}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
      <View style={styles.yourBet}>
        {isSetBet ? (
          <>
            {isEnd ? (
              <TouchableWithoutFeedback onPress={cancelBet}>
                <View style={[styles.yourBetButton, isSetBet && styles.cancelButton]}>
                  <Text style={styles.yourBetButtonText}>Отмена</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={catchReward}>
                <View style={styles.yourBetButton}>
                  <Text style={styles.yourBetButtonText}>Вывести</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </>
        ) : (
          <TouchableWithoutFeedback onPress={confirmBet}>
            <View style={styles.yourBetButton}>
              <Text style={styles.yourBetButtonText}>Ставка {parseFloat(bet).toFixed(2)}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    backgroundColor: '#1b1c1d',
    borderRadius: 30,
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
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.45,
    height: height * 0.05,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  betButton: {
    width: width * 0.09,
    height: height * 0.04,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#878787',
    justifyContent: 'center',
    alignItems: 'center',
  },
  betButtonText: {
    color: '#878787',
  },
  betAmount: {
    color: '#FFFFFF',
    width: width * 0.25,
    fontSize: 24,
    marginHorizontal: 0,
    textAlign: 'center',
  },
  sumBetPatterns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width * 0.5,
  },
  betPattern: {
    width: width * 0.2,
    height: height * 0.03,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    textAlign: 'center',
  },
  betPatternText: {
    color: '#878787',
    fontSize: 15,
  },
  yourBet: {
    marginLeft: 200,
    marginBottom: 10,
  },
  yourBetButton: {
    width: width * 0.4,
    height: height * 0.14,
    backgroundColor: '#69ba2f',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#c41616',
  },
  yourBetButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    width: width * 0.4,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Bet;
