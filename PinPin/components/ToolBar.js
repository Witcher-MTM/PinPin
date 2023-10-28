import React from 'react';
import { Dimensions, View, Text, TouchableWithoutFeedback, StyleSheet, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default ToolBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={[styles.text, styles.leftText]}>Aviator</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>3000.00 USD</Text>
                    <Text style={styles.separator}>|</Text>
                    <TouchableWithoutFeedback>
                        <Text style={styles.icon}>|||</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'gray'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        margin: 5,
        fontSize: 20
    },
    leftText: {
        width: width * 0.55
    },
    separator: {
        marginHorizontal: 5,
    },
    icon: {
        fontSize: 20,
    },
});
