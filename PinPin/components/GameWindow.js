import { Dimensions, View, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { Easing, withRepeat, useSharedValue, useAnimatedStyle, withTiming , cancelAnimation} from 'react-native-reanimated';
import CrashScore from './CrashScore';
import { useSelector, useDispatch } from 'react-redux';
import { setScore, setGameEnd } from '../modules/ScoreSlice'

const { width, height } = Dimensions.get('window');

export default GameWindow = () => {
    const translateY = useSharedValue(-20);
    const Score = (useSelector((state) => state.score.value)) 
    const isEndGame = useSelector((state) => state.score.isEnd)
    const translateX = useSharedValue(0);
    const restartGame = () => {
        console.log("time out")
        translateX.value = 0
        translateY.value = 0
    }
    const animateToPoint = async () => {
        translateX.value = withTiming(250, { duration: 5000, easing: Easing.linear });
        translateY.value = withTiming(-100, { duration: 5000, easing: Easing.linear });
    };
    const StartGame = async () => {
        if (!isEndGame) {
            animateToPoint();
        } else {
            console.log("Score in gameWindow", Score[Score.length-1])
            console.log("game is end", isEndGame)
            cancelAnimation(translateX)
            cancelAnimation(translateY)
        }

    }
    React.useEffect(() => {
        StartGame()
        return () => {
            setTimeout(() => {
                restartGame() 
              }, 5000); 
        };
    }, [isEndGame]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
        };
    });
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <CrashScore></CrashScore>
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
        borderColor: "#5c5c5c",
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

});
