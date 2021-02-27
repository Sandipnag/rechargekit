import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LEFT_ARROW, MONEY_TRANSFER, RIGHT_ARROW_CIRCLE } from '../../constants/imagepath';
import { HEIGHT, WIDTH } from '../../constants/values';
import { FACEBOOK_BLUE } from '../../constants/colors';
import { GETNETWORK } from '../../utils/Network';
import { storeObjByKey } from '../../utils/Storage';
import { BASE_URL } from '../../constants/url';
import { showMessage } from 'react-native-flash-message';

const BankFinance = () => {

    const navigation = useNavigation();
    const [phNo, setPhNo] = useState('')

    useEffect(() => {
        navigation.setOptions({
            style: {
                backgroundColor: 'red'
            },
            headerStyle: {
                backgroundColor: '#2370eb'
            },
            headerLeft: () => (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Home');
                }}>
                    <Image source={LEFT_ARROW} style={{ width: 25, height: 25, tintColor: '#fff' }} />
                </TouchableOpacity>

                <View style={{ width: 20 }} />
                <Text style={{ color: '#FFF', fontSize: 20 }}>Bank Finance</Text>
            </View>),
            headerTitle: null
        })
    }, [navigation]);

    const login = () => {
        let url = `${BASE_URL}moneytransfer/rechargekitmsspayment/dologin?mobile_no=${phNo}`;
        GETNETWORK(url, true).then((res) => {
            console.log(res)
            if (res.status == 200) {
                storeObjByKey('remiterData', res.data).then((res) => {
                    navigation.navigate('MoneyTransfer')
                })
            }else{
                showMessage({
                    message:'This number is not registered with us.',
                    type:'danger'
                })
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#edeae1' }}>
                <View style={{ height: 120, backgroundColor: '#2370eb' }}>
                    <Image style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }} source={MONEY_TRANSFER} />
                </View>
                <View style={styles.absoluteContainer}>

                    <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 20, ...styles.shadow, marginTop: 10, paddingHorizontal: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                placeholder={'Enter remitter number'}
                                value={phNo}
                                onChangeText={(data) => {
                                    setPhNo(data)
                                }}
                                keyboardType={'phone-pad'}
                                style={{
                                    height: 50,
                                    borderBottomWidth: 1,
                                    flex: 1

                                }} />
                            <TouchableOpacity onPress={() => {
                                login()
                                // navigation.navigate('MoneyTransfer')
                            }}>
                                <Image style={{ width: 30, height: 30 }} source={RIGHT_ARROW_CIRCLE} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('RemiterRegistration');
                            }}
                            activeOpacity={0.7}
                            style={{
                                borderRadius: 5,
                                backgroundColor: FACEBOOK_BLUE,
                                height: 50,
                                justifyContent: 'center',
                                paddingHorizontal: 10
                            }}>
                            <Text style={{ color: '#fff' }}>Remitter Registration</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    absoluteContainer: {
        height: HEIGHT * .5,
        position: 'absolute',
        backgroundColor: 'transparent',
        width: WIDTH,
        top: HEIGHT * .12,
        paddingHorizontal: 10,
        zIndex: 999
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})

export default BankFinance
