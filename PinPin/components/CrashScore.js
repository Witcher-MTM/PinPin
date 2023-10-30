import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from "react-redux";
import { setScore } from '../modules/ScoreSlice'
export default CrashScore = () => {
    const [a, setA] = React.useState((Math.random() * 3).toFixed(2));
    const [scoreVisible, setScoreVisible] = React.useState(1)
    const [color, setColor] = React.useState(false)
    const dispatch = useDispatch()
    React.useEffect(() => {
        let scoreVisible = 0
        // function creation
        let interval = setInterval(function () {
            scoreVisible+=0.1
                console.log("random", a)
                console.log("score", scoreVisible)
                setScoreVisible(scoreVisible)
            if (parseFloat(scoreVisible).toFixed(2) >= a) {
                dispatch(setScore(Number(scoreVisible)))
                setColor(true)
                console.log("stop")
                clearInterval(interval);
            }else{
                setColor(false)
            }
        }, 400);
    }, []);


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
    scoreLabelEnd:{
        color:"red"
    }
});