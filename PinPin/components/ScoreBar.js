import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import ScoreBarElements from './ScoreBarElements';

const { width, height } = Dimensions.get('window');
export default ScoreBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <ScoreBarElements scoreid={"test"} text={"text"}></ScoreBarElements>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:15,
        backgroundColor: '#000000',
        alignItems: 'left',
        width: width,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
