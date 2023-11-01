import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from "react-redux";
import { setScore, setGameEnd, setIsGame, setHistoryScore } from '../modules/ScoreSlice'
export default CrashScore = () => {
    const [randNumber, setRandNumber] = React.useState((Math.random() * (10 - 1) + 1).toFixed(2));
    const [scoreVisible, setScoreVisible] = React.useState(1)
    const [color, setColor] = React.useState(false)
    const dispatch = useDispatch()
    React.useEffect(() => {
        console.log("random", randNumber)
        let LocalscoreVisible = 1
        let interval = setInterval(async function () {
            if(LocalscoreVisible>5){
                LocalscoreVisible += 0.25
            }
            else if(LocalscoreVisible>15){
                LocalscoreVisible += 0.35
            }
            else if(LocalscoreVisible>25){
                LocalscoreVisible += 0.50
            }
            else if(LocalscoreVisible>50){
                LocalscoreVisible += 0.75
            }
            else{
                LocalscoreVisible += 0.1
            }
            await setScoreVisible(LocalscoreVisible)
            if (LocalscoreVisible > randNumber) {
                await dispatch(setHistoryScore(Number(LocalscoreVisible).toFixed(2)))
                await dispatch(setScore(Number(LocalscoreVisible).toFixed(2)))
                await dispatch(setGameEnd(true))
                await setColor(true)
                console.log("stop")
                setTimeout(() => {
                    setRandNumber((Math.random() * (10 - 1) + 1).toFixed(2))
                  }, 5000); 
                clearInterval(interval);
            } else {
                await dispatch(setScore(Number(LocalscoreVisible).toFixed(2)))
                await dispatch(setGameEnd(false))
                await setColor(false)
            }
        }, 150);
    }, [randNumber]);


    return (
        <Text style={[styles.scoreLabel, color && styles.scoreLabelEnd]}>{parseFloat(scoreVisible).toFixed(2)}x</Text>
    );
}
const styles = StyleSheet.create({
    scoreLabel: {
        position: 'absolute',
        fontSize: 30,
        top: '15%',
        left: '40%',
        color: "#FFFFFF"
    },
    scoreLabelEnd: {
        color: "red"
    }
});