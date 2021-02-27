import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { BASE_URL } from '../../constants/url';
import { GETNETWORK } from '../../utils/Network';
import { getObjByKey } from '../../utils/Storage';
import Spinner from 'react-native-loading-spinner-overlay';
const Transfer = ({ route, navigation }) => {
    const [data, setData] = useState({
        beneId: '',
        trans_pin: '',
        amount: '',
        customer_mobile: ''
    });
    const [loading,setLoading] = useState(false);
    const transfer = () => {
        setLoading(true);
        getObjByKey('remiterData').then((res) => {
           
            console.log(res);
            let url = `${BASE_URL}moneytransfer/rechargekitmsspayment/moneyTransfer?customer_mobile=${res.customer_mobile}&amount=${data.amount}&beneId=${route.params.beneId}&trans_pin=${data.trans_pin}`

            // console.log(url)
            if (data.amount < res.dailyLimit) {
                GETNETWORK(url, true).then((transres) => {
                    setLoading(false);
                    if(transres.status==200){
                        showMessage({
                            message: "Money transferred successfully",
                            type: "success",
                        });
                        navigation.navigate('BankFinance')
                    }
                })
            } else {
                showMessage({
                    message: "Daliy Limit Crossed",
                    type: "warning",
                });
            }

        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Spinner visible={loading} />
            <View style={{ flex: 1, padding: 10 }}>
                <TextInput
                    onChangeText={(val) => {
                        let temp = { ...data };
                        temp.amount = val;
                        setData(temp)
                    }}
                    keyboardType={'number-pad'}
                    style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                    placeholder={'Amount'}
                />
                <View style={{ height: 15 }} />
                <TextInput
                    style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                    placeholder={'Transaction Pin'}
                    onChangeText={(val) => {
                        let temp = { ...data };
                        temp.trans_pin = val;
                        setData(temp)
                    }}
                    keyboardType={'default'}
                />
                <View style={{ height: 15 }} />
                <TouchableOpacity
                    onPress={() => {
                        transfer()
                    }}
                    style={{ height: 50, width: 200, backgroundColor: '#4287f5', alignSelf: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Transfer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Transfer
