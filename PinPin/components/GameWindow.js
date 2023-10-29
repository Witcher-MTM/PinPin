import { Dimensions, View, Text, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import Animated, { Easing, withSpring, withRepeat, useSharedValue, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

export default GameWindow = () => {
    const [a,setA] = React.useState((Math.random() * 50).toFixed(2));
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const score = useSharedValue(0);
    const [intervalID, setIntervalID] = useState(null)
    const updateScore = () => {
        score.value = withTiming(score.value + 0.1, { duration: 250 });
        console.log(score.value)
        return score.value
    };
    const RandA = () => {
        setA((Math.random() * 50).toFixed(2));
    };
    const animateToPoint = () => {
        translateX.value = withTiming(250, { duration: 5000, easing: Easing.linear });
        translateY.value = withTiming(-100, { duration: 5000, easing: Easing.linear }, () => {
            console.log("anim end")
            translateY.value = withRepeat(withTiming(-100, { duration: 3500, easing: Easing.linear }), -1, true);
        });
    };
    React.useEffect(() => { 
        RandA();
        animateToPoint();
        setIntervalID(setInterval(() => {
            updateScore();
        }, 1000));
    
        return () => clearInterval(intervalID);
        
    },[]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
        };
    });
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
            <Text style={styles.scoreLabel}>{updateScore()}</Text> 
                <View style={styles.chart}>
                    <Animated.View style={[styles.line, animatedStyle]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartContainer: {
        width: width * 0.95,
        height: height * 0.3,
        borderWidth: 2,
        borderColor:"#5c5c5c",
        borderRadius: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    chart: {
        width: width * 0.9,
        height: '20%',
        borderTopWidth: 3,
        borderColor: '#000000',
    },
    line: {
        width: 10,
        height: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    scoreLabel: {
        position: 'absolute',
        fontSize:30,
        top: '15%',
        left: '40%',
        color:"#FFFFFF"
    }
});
