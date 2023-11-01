import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import {getDataFromLocalStorage} from '../modules/LocalStorage'
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

export default ToolBar = () => {
    const [totalMoney, setTotalMoney] = React.useState(0)
    const tmp = useSelector((state)=>state.money.value)
    React.useEffect(()=>{
        setTotalMoney(tmp)
    },[tmp])
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={[styles.text, styles.leftText]}>Aviator</Text>
                <View style={styles.row}>
                    <Text style={[styles.text, styles.moneyText]}>{parseFloat(totalMoney).toFixed(2)} USD</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'#1b1c1d',
        fontFamily:"Roboto"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        margin: 10,
        fontSize: 20
    },
    leftText: {
        width: width * 0.58,
        color:"#990000"
    },
    moneyText:{
        color:"#00e808"
    }
});
