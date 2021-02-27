import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { BASE_URL } from '../../constants/url';
import { GETNETWORK } from '../../utils/Network';
import RBSheet from "react-native-raw-bottom-sheet";
import { FONTFAMILY, HEIGHT } from '../../constants/values';
const AddBeneficiary = () => {
    const [data, setData] = useState({
        customer_mobile: '',
        benefMobileNumber: '',
        name: '',
        email: '',
        bankAccountNumber: '',
        ifscCode: '',
        bankName: '',
        city: '',
        state: '',
        pincode: '',
        address1: '',
    });
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [bankList, setBankList] = useState(null);
    useEffect(() => {
        fetchAllbank();
    }, [])

    const fetchAllbank = () => {
        let url = `${BASE_URL}moneytransfer/rechargekitmsspayment/bankList`;
        GETNETWORK(url, true).then((res) => {
            if (res.status == 200) {
                setBankList(res.data);
            }
        })
    }

    const addBeneficiary = () => {
        console.log(JSON.stringify(data, null, 4))
        const { address1, pincode, state, city, name, bankAccountNumber, bankName, benefMobileNumber, customer_mobile, email, ifscCode } = data;
        let url = `${BASE_URL}moneytransfer/rechargekitmsspayment/addBeneficiary?customer_mobile=${customer_mobile}&benefMobileNumber=${benefMobileNumber}&city=${city}&state=${state}&pincode=${pincode}&address1=${address1}&name=${name}&bankAccountNumber=${bankAccountNumber}&bankName=${bankName}&email=${email}&ifscCode=${ifscCode}`;
        console.log(url)
        GETNETWORK(url, true).then((res) => {
            if (res.status == 200) {
                showMessage({
                    message: "Beneficiary Added Successful",
                    type: "success",
                });
                navigation.goBack();
            } else if (res.status == 404) {
                showMessage({
                    message: res.msg,
                    type: "danger",
                });
            } else {
                showMessage({
                    message: "Some Error Occurs.",
                    type: "danger",
                });
            }
        })
    }

    const dropDownListComponent = ({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    let temp = {...data};
                    temp.bankName = item.bank_name;
                    setData(temp);
                    refRBSheet.current.close()
                }}
                style={{ borderBottomWidth: 0.5, height: 50, backgroundColor: '#fff', borderRadius: 5, justifyContent: 'center',alignItems:'center' }}>
                <Text style={{ color: '#4287f5', fontFamily: FONTFAMILY.ROBOTOBOLD }}>{item.bank_name}</Text>
            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, }}
                showsVerticalScrollIndicator={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ padding: 15 }}>
                        <TextInput
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.customer_mobile = val;
                                setData(temp)
                            }}
                            keyboardType={'phone-pad'}
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Customer Mobile Number'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Beneficiary Mobile Number'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.benefMobileNumber = val;
                                setData(temp)
                            }}
                            keyboardType={'phone-pad'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Name'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.name = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />

                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Email'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.email = val;
                                setData(temp)
                            }}
                            keyboardType={'email-address'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Bank A/C Number'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.bankAccountNumber = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'IFSC Code'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.ifscCode = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />
                        <View style={{ height: 15 }} />
                        <TouchableOpacity onPress={()=>{
                            refRBSheet.current.open()
                        }}>
                            <TextInput
                                style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                                placeholder={'Bank Name'}
                                placeholderTextColor={data.bankName ? '#000' : 'gray'}
                                editable={false}
                                onChangeText={(val) => {
                                    let temp = { ...data };
                                    temp.bankName = val;
                                    setData(temp)
                                }}
                                value={data.bankName}
                                keyboardType={'default'}
                            />
                        </TouchableOpacity>

                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'City'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.city = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'State'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.state = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Pincode'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.pincode = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />
                        <View style={{ height: 15 }} />
                        <TextInput
                            style={{ height: 150, borderWidth: 1, borderRadius: 5, paddingLeft: 10, textAlignVertical: 'top' }}
                            placeholder={'Address'}
                            onChangeText={(val) => {
                                let temp = { ...data };
                                temp.address1 = val;
                                setData(temp)
                            }}
                            keyboardType={'default'}
                        />
                        <View style={{ height: 15 }} />
                        <TouchableOpacity
                            onPress={() => {
                                addBeneficiary();
                            }}
                            style={{ height: 50, width: 200, backgroundColor: '#4287f5', alignSelf: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Add Beneficiary A/C</Text>
                        </TouchableOpacity>
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={false}
                            closeOnPressMask={true}
                            height={HEIGHT * .6}
                            customStyles={{
                                container: {
                                    // backgroundColor: PURE_WHITE,
                                    paddingVertical: 20
                                }
                            }}
                        >
                            <FlatList
                                data={bankList}
                                renderItem={dropDownListComponent}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </RBSheet>
                    </View>


                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )

}

export default AddBeneficiary;