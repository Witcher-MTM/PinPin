import {Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import ToolBar from '../components/ToolBar';
import ScoreBar from '../components/ScoreBar';
import GameWindow from '../components/GameWindow';
import Bet from '../components/Bet/Bet';
import React from 'react';
import {clearAllData, getDataFromLocalStorage, saveDataToLocalStorage, saveUserDataWithDate} from "../modules/LocalStorage"
import { useDispatch, useSelector } from 'react-redux';
import { setMoney } from '../modules/MoneySlice';
import HistoryOfBet from '../components/HistoryOfBet';

export default Main = () => {
  const dispatch = useDispatch()
  const checkForLocalVariables = async()=>{
    await saveUserDataWithDate()
    const total_money = await getDataFromLocalStorage("total_money")
    if(total_money==null){
      await saveDataToLocalStorage({key:"total_money", data:3000})
      dispatch(setMoney(3000))
    }
    else{
      dispatch(setMoney(total_money))
    }
  }
  React.useEffect(()=>{
    checkForLocalVariables()
  })
  return (
      <SafeAreaView style={styles.container}>
      <ToolBar/>
      <ScoreBar/>
      <GameWindow/>
      <Bet/>
      <HistoryOfBet></HistoryOfBet>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 44, 
        alignContent:"center",
        alignItems:"center",
        backgroundColor:'#000000'
      },
})