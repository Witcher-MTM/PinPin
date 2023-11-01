import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { Easing, withSpring, useSharedValue, useAnimatedStyle, withSequence } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import { useSelector } from 'react-redux';

const MessageView = ({ text, backgroundColor, score }) => {
    const opacity = useSharedValue(0);
    const WinValue = useSelector((state)=>state.money.winValue)
    useEffect(() => {
        opacity.value = withSequence(
            withSpring(1, { damping: 2, stiffness: 80 }),
            withSpring(0, { damping: 2, stiffness: 80 })
        );
    }, [WinValue]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            backgroundColor: backgroundColor,
        };
    });

    return (
        <Animated.View
            style={[styles.messageView, animatedStyle]}
        >
            <Text style={styles.text}>{text}:{WinValue}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    messageView: {
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        top: '5%',
        left: '15%',
        borderRadius:20,
        width:width*0.7,
        height:height*0.1
    },
    text:{
        fontSize: 15,
    }
});

export default MessageView;
