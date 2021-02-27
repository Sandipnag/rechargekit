import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, TextInput, Text, StyleSheet, Image, FlatList } from 'react-native';
import { FONTFAMILY } from '../../constants/values';
import { BIN, PLUSCIRCLE } from '../../constants/imagepath';
import { getObjByKey } from '../../utils/Storage';
import { BASE_URL } from '../../constants/url';
import { GETNETWORK } from '../../utils/Network';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const MoneyTransfer = () => {

    const DATA = [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }];
    const [userDetails, setUserDetails] = useState(null)
    const [beneficiaryList, setBeneficiaryList] = useState(null);
    const navigation = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
            fetchUserDetails();
        }, [])
    );

    const fetchUserDetails = () => {
        getObjByKey('remiterData').then((data) => {
            setUserDetails(data);
            beneficiaryAcList(data.customer_mobile);
        })
    }

    const beneficiaryAcList = (customer_mobile) => {
        let url = `${BASE_URL}moneytransfer/rechargekitmsspayment/beneficiaryList?customer_mobile=${customer_mobile}`;
        GETNETWORK(url, true).then((res) => {
            setBeneficiaryList(res.data);
        })
    }

    const transferMoney = (beneficiary_id) => {
        navigation.navigate('Transfer',{beneId:beneficiary_id});
    }

    const renderHistory = ({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={()=>{
                    transferMoney(item.beneficiary_id)
                }}
            style={{ borderWidth: 0.5, height: 100, backgroundColor: '#fff', ...styles.shadow, borderRadius: 5, flexDirection: 'row' }}>
                <View style={{ flex: 0.8, padding: 10 }}>
                    <Text style={{ color: '#4287f5', fontFamily: FONTFAMILY.ROBOTOBOLD }}>{item.name}</Text>
                    <Text style={{ color: '#9099a6', fontFamily: FONTFAMILY.ROBOTOREGULAR }}>{item.bankAccountNumber}</Text>
                    <Text style={{ color: '#9099a6', fontFamily: FONTFAMILY.ROBOTOREGULAR }}>{item.bankName}</Text>
                </View>
                {/* <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={BIN} style={{width:25,height:25}} />
                </View> */}
            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 22, }}>
                <View style={{ ...styles.userBox, ...styles.shadow, borderRadius: 10 }}>
                    <Text style={{ color: '#000', fontSize: 18, textAlign: 'center', fontFamily: FONTFAMILY.ROBOTOBOLD }}>
                        {userDetails ? userDetails.customer_name : ''}
                    </Text>
                    <View style={{ height: 10 }} />
                    <Text style={{ color: 'gray', alignSelf: 'center', fontFamily: FONTFAMILY.ROBOTOREGULAR }}>
                        {userDetails ? userDetails.customer_mobile : ''} | KYC Status
                    </Text>
                    <View style={{ height: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ height: 40, width: '45%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                                {userDetails ? userDetails.dailyLimit : ''}
                            </Text>
                            <Text style={{ color: 'black', fontSize: 12 }}>TOTAL LIMIT</Text>
                        </View>
                        <View style={{ height: 40, width: '45%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                                {userDetails ? userDetails.remainingMonthlyLimit : ''}
                            </Text>
                            <Text style={{ color: 'black', fontSize: 12 }}>REMAINING LIMIT</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 20 }} />
                {/* <View style={{ height: 50, borderWidth: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 5, paddingHorizontal: 5 }}>
                    <TextInput placeholder={`Search Beneficiary by A/C number`} style={{ flex: 1 }} />
                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>Search</Text>
                </View> */}
                <View style={{ height: 20 }} />
                {beneficiaryList && <FlatList
                    data={beneficiaryList}
                    contentContainerStyle={{
                        backgroundColor: '#fff'
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderHistory}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 10 }} />
                        )

                    }}
                    keyExtractor={(item, index) => item.id.toString()}
                />}
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddBeneficiary')
                }} style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Image style={{ width: 50, height: 50 }} source={PLUSCIRCLE} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    userBox: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    }
})

export default MoneyTransfer;