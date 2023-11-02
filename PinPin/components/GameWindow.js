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
    const slideOpacity = useSharedValue(1);
    const propellerRotation = useSharedValue(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const animateToPoint = () => {
        cancelAnimation(progress)
        cancelAnimation(propellerRotation)
        translateX.value = withTiming(200, { duration: 7500, easing: Easing.linear });
        translateY.value = withTiming(-150, { duration: 7500, easing: Easing.sin }, () => {
            translateY.value = withRepeat(
                withSpring(-145, { damping: 2, stiffness: 15 }),
                -1, 
                false 
            );
        });

    };
    const animProgress = () => {
        progress.value = withTiming(1, { duration: 4000 });
    }
    const animatePropeller = () => {
        propellerRotation.value = withRepeat(
            withTiming(1800, { duration: 4000, easing: Easing.linear }),
            -1, 
            true 
        );
    };
    const animatedSlideStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
            opacity: slideOpacity.value,
        };
    });
    const StartGame = async () => {
        if (!isEndGame) {
            setIsAnimating(true)
            animateToPoint();
        } else {
            cancelAnimation(translateX)
            cancelAnimation(translateY)
            setIsAnimating(false)

            translateX.value = withTiming(3000, { duration: 2000, easing: Easing.linear });
            translateY.value = withTiming(-400, { duration: 500, easing: Easing.linear });

            progress.value = 0
            propellerRotation.value = 0
            setTimeout(() => {
                setWaitingForNewGame(true)
                animProgress();
                animatePropeller();
            }, 2500);
            setTimeout(() => {
                console.log("Score in gameWindow", Score[Score.length - 1])
                console.log("game is end", isEndGame)
                dispatch(setisWin(false))
                translateX.value = 0
                translateY.value = 0
                setWaitingForNewGame(false)
            }, 6500);
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
    const animatedPropStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: 0 },
                { translateY: 0 },
                { rotate: `${propellerRotation.value}deg` },
            ],
        };
    });
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                {waitingForNewGame ?
                    <View style={styles.progressBarContainer}>
                        <Animated.Image source={require("../resources/images/propeller.png")} style={[styles.propeller, animatedPropStyle]}></Animated.Image>
                        <Animated.View style={[styles.progressBar, progressBarStyle]}></Animated.View>
                    </View> : <ImageBackground source={require("../resources/gif/sky_2.gif")} style={styles.chartContainer}>
                        <CrashScore></CrashScore>
                        {isWin ? <MessageView text={"U win"} backgroundColor={"rgb(3, 252, 15)"} /> : <></>}
                        <View style={styles.chart}>
                            <Animated.Image source={require("../resources/images/airplane.png")} style={[styles.image, animatedStyle]}></Animated.Image>
                            <Animated.View style={[styles.slide, animatedSlideStyle]}></Animated.View>
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
    waitingText: {
        color: "#FFFFFF",
        fontSize: 20
    },
    progressBarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: height * 0.4,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#c41616',
    },
    propeller: {
        width: width * 0.3,
        height: height * 0.14,
        borderRadius: 20,
    },
});
