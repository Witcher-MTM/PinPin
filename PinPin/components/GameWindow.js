import { Dimensions, View, Text, TouchableWithoutFeedback, StyleSheet, Animated, Easing } from 'react-native';
import React, { useState, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default GameWindow = () => {
    const [a, setA] = useState((Math.random() * 50).toFixed(2));
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const [score, setScore] = useState(0);

    const RandA = () => {
        setA((Math.random() * 50).toFixed(2));
    };

    const animateToPoint = (toValue) => {
        const animationX = Animated.timing(translateX, {
            toValue: 90, // Зсув в правий кут
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: false,
        });

        const animationY = Animated.timing(translateY, {
            toValue: -75, // Зсув вгору
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: false,
        });
        const swingAnimation = Animated.sequence([
            Animated.timing(translateY, {
              toValue: -85, // Зсув вверх
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(translateY, {
              toValue: -75, // Возврат в исходное положение
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]);
        Animated.parallel([animationX, animationY]).start(({ finished }) => {
            if (finished) {
                
            }
        });
    };
    React.useEffect(() => {
        animateToPoint(a)
    }, [a]);

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <Text style={styles.scoreLabel}>{(score).toFixed(2)}</Text>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartContainer: {
        width: width * 0.95,
        height: height * 0.4,
        backgroundColor: 'red',
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
        top: '30%',
        left: '45%'
    }
});
