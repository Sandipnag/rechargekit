import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PURE_BLACK, PURE_WHITE } from '../../constants/colors';
import { getObjByKey } from '../../utils/Storage';
import { FONTFAMILY, GAP, WIDTH } from '../../constants/values';


export default TransactionDetails = () => {

    useFocusEffect(
        React.useCallback(() => {
            getTransactionDetails();
            return () => { };
        }, [])
    );

    const [details, setDetails] = useState(null);

    const navigation = useNavigation();

    const getTransactionDetails = () => {
        getObjByKey('transaction').then((res) => {
            console.log(res)
            setDetails(res)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 15 }}>
                <View style={{ minHeight: 100, backgroundColor: PURE_WHITE, padding: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.value}>{details && details.operator_name}</Text>
                        <Text style={styles.value}>₹ {details && details.order_customer_amount}</Text>
                    </View>
                    <View style={{ height: GAP.SMALL }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.value}>{details && details.order_customer_ref}</Text>
                        {details &&  <View style={{ height: 30, width: 70, justifyContent: 'center', alignItems: 'center', 
                        backgroundColor: details.order_status == 'success' ? 'green' : details.order_status == 'hold' ? 'blue' : details.order_status == 'Failed' ? 'red' : DARK_ASH }}>
                            <Text style={{ color: PURE_WHITE, flexShrink: 1, fontSize: WIDTH * .03, textAlign: 'right', textTransform: 'capitalize' }}>
                                {details.order_status}
                            </Text>
                        </View>}
                        
                    </View>
                    <View style={{ height: GAP.SMALL }}></View>
                    <Text style={styles.value}>{details && details.order_date}</Text>
                    <View style={{ height: GAP.SMALL }}></View>
                    <Text style={styles.value}>Order Mode:  {details && details.order_mode}</Text>
                    <View style={{ height: GAP.SMALL }}></View>
                    <Text style={styles.value}>Order Before Balance: ₹  {details && details.order_before_balance}</Text>
                </View>
            </View>
            {/* <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }} style={{ flex: 1 }}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Order Status : </Text>
                    <Text style={styles.value}>{details && details.order_status}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Order ID : </Text>
                    <Text style={styles.value}>{details && details.order_id}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Order Name : </Text>
                    <Text style={styles.value}>{details && details.operator_name}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Balance before Order : </Text>
                    <Text style={styles.value}>{details && details.order_before_balance}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Recharge Amount : </Text>
                    <Text style={styles.value}>{details && details.order_customer_amount}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Order Mode : </Text>
                    <Text style={styles.value}>{details && details.order_mode}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Mobile Number : </Text>
                    <Text style={styles.value}>{details && JSON.parse(details.order_static_data).mobile_no}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.label}>Recharge Type : </Text>
                    <Text style={styles.value}>{details && JSON.parse(details.order_static_data).recharge_type}</Text>
                </View>
                <View style={{height:GAP.MEDIUM}}/>
            </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontFamily: FONTFAMILY.ROBOTOBOLD
    },
    value: {
        fontSize: 15,
        fontFamily: FONTFAMILY.ROBOTOMEDIUM,
        textTransform: 'capitalize'
    }
})