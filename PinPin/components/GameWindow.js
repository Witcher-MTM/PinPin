import { Dimensions, View,StyleSheet } from 'react-native';
import React from 'react';
import Animated, { Easing, withRepeat, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CrashScore from './CrashScore';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

export default GameWindow = () => {
    const translateY = useSharedValue(0);
    const Score = useSelector((state) => state.score.value)
    const isEndGame = useSelector((state)=>state.score.isEnd)
    const translateX = useSharedValue(0);

    const animateToPoint = async () => {
        translateX.value = withTiming(250, { duration: 5000, easing: Easing.linear });
        translateY.value = withTiming(-100, { duration: 5000, easing: Easing.linear }, () => {
            console.log("anim end")
            translateY.value = withRepeat(withTiming(-100, { duration: 3500, easing: Easing.linear }), -1, true);
        });
    };
    const StartGame = async()=>{
        if(!isEndGame){
            animateToPoint(); 
        }else{
            console.log("Score in gameWindow", Score)
            console.log("game is end", isEndGame)
        }
        
    }
    React.useEffect(() => { 
        StartGame()
    },[Score]);
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
    
});
