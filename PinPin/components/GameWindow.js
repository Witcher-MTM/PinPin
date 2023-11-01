import { Dimensions, View, StyleSheet, ImageBackground, Text } from 'react-native';
import React from 'react';
import Animated, { Easing, withRepeat, useSharedValue, useAnimatedStyle, withTiming, cancelAnimation, withSpring } from 'react-native-reanimated';
import CrashScore from './CrashScore';
import { useSelector, useDispatch } from 'react-redux';
import MessageView from '../components/MessageView';
import { setisWin } from '../modules/ScoreSlice';

const { width, height } = Dimensions.get('window');

export default GameWindow = () => {
    const isWin = useSelector((state) => state.score.isWin)
    const dispatch = useDispatch()
    const translateY = useSharedValue(-20);
    const Score = (useSelector((state) => state.score.value))
    const isEndGame = useSelector((state) => state.score.isEnd)
    const progress = useSharedValue(0);
    const [waitingForNewGame, setWaitingForNewGame] = React.useState(false);
    const translateX = useSharedValue(0);
    const animateToPoint = () => {
        translateX.value = withTiming(250, { duration: 5000, easing: Easing.linear });
        translateY.value = withTiming(-150, { duration: 5000, easing: Easing.linear }, () => {
            translateY.value = withRepeat(
                withSpring(-145, { damping: 2, stiffness: 30 }),
                -1, // -1 вказує, що анімація повторюється безмежну кількість разів
                false // true означає, що анімація почнеться спочатку після завершення
            );
        });

    };
    const animProgress = () => {
        progress.value = withTiming(1, { duration: 4000 });
    }
    const StartGame = async () => {
        if (!isEndGame) {
            animateToPoint();

        } else {
            cancelAnimation(translateX)
            cancelAnimation(translateY)
            progress.value = 0
            setTimeout(() => {
                setWaitingForNewGame(true)
                animProgress();
            }, 1500);
            setTimeout(() => {
                console.log("Score in gameWindow", Score[Score.length - 1])
                console.log("game is end", isEndGame)
                dispatch(setisWin(false))
                translateX.value = 0
                translateY.value = 0
                setWaitingForNewGame(false)
            }, 5000);
        }
    }
    React.useEffect(() => {
        StartGame()
    }, [isEndGame]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
        };
    });
    const progressBarStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value * 100}%`,
            height: 10,
            backgroundColor: '#c41616',
        };
    });
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                {waitingForNewGame ?
                    <View style={styles.progressBarContainer}>
                        <Text style={styles.waitingText}>Waiting for new game</Text>
                        <Animated.View style={[styles.progressBar, progressBarStyle]}></Animated.View>
                    </View> : <ImageBackground source={require("../resources/gif/sky.gif")} style={styles.chartContainer}>
                        <CrashScore></CrashScore>
                        {isWin ? <MessageView text={"U win"} backgroundColor={"rgb(3, 252, 15)"} /> : <></>}
                        <View style={styles.chart}>
                            <Animated.Image source={require("../resources/images/airplane.png")} style={[styles.image, animatedStyle]}></Animated.Image>
                        </View>
                    </ImageBackground>}
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
        backgroundColor: "#171717",
        borderRadius: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    chart: {
        width: width * 0.9,
    },
    line: {
        width: 10,
        height: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    waitingText:{
        color:"#FFFFFF",
        fontSize:20
    },
    progressBarContainer: {
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height: height*0.4,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#c41616',
    },
});
