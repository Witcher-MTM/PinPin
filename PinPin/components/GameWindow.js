import { Dimensions, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import React, { useState, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default GameWindow = () => {
    const [a, setA] = useState((Math.random() * 50).toFixed(2));
    const translateY = useState(new Animated.Value(0))[0];
    const translateYForLoop = useState(new Animated.Value(0))[0];
    const translateX = useState(new Animated.Value(0))[0];
    const [score, setScore] = useState(0);
    const [scoreInterval, setScoreInterval] = useState(null);
    const updateScore = () => {
        setScore((prevScore) => parseFloat(prevScore + 0.1).toFixed(1));
      };
    const RandA = () => {
        setA((Math.random() * 50).toFixed(2));
    };
    const Swinging = () =>{
        translateY.setValue(-1000)
        const swingAnimation = Animated.sequence([
            Animated.timing(translateY, {
              toValue: -100, // Початкове значення згори
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(translateY, {
              toValue:-150, // Повернення до поточного значення
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]);
        return swingAnimation
    }
    const animateToPoint = () => {
        const animationX = Animated.timing(translateX, {
            toValue: 250, // Зсув в правий кут
            duration: 3500,
            easing: Easing.linear,
            useNativeDriver: false,
        });

        const animationY = Animated.timing(translateY, {
            toValue: -100, // Зсув вгору
            duration: 3500,
            easing: Easing.linear,
            useNativeDriver: false,
        });
        Animated.parallel([animationX, animationY]).start(({ finished }) => {
            if (finished) {
                const loop = Animated.loop(Swinging());
                loop.start();
            }
        });
    };
    React.useEffect(() => {
        const intervalId = setInterval(updateScore, 250); 
        if(score >= a){
            console.log("crash")
        }
        setScoreInterval(intervalId);
    }, [a]);

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <Text style={styles.scoreLabel}>{parseFloat(score).toFixed(2)}</Text>
                <View style={styles.chart}>
                    <Animated.View
                        style={[
                            styles.line,
                            {
                                transform: [
                                    { translateX },
                                    { translateY },
                                ],
                            },
                        ]}
                    />
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
