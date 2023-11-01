import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { Easing, withSpring, useSharedValue, useAnimatedStyle, withSequence } from 'react-native-reanimated';

const MessageView = () => {
  const opacity = useSharedValue(0); // Використовуємо анімацію для управління прозорістю

  useEffect(() => {
    // Встановлюємо анімацію "fade" після завантаження компонента
    opacity.value = withSequence(
      withSpring(1, { damping: 2, stiffness: 80 }), // З'явлення анімації
      withSpring(0, { damping: 2, stiffness: 80 }) // Зникнення анімації
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[styles.messageView, animatedStyle]}
    >
      <Text>Some text</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    backgroundColor: 'rgba(0, 255, 0, 0.5)', // Зелений колір з прозорістю 50%
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageView;
