import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { BASE_URL } from '../../constants/url';
import { GETNETWORK } from '../../utils/Network';
const RemiterRegistration = () => {
    const [data, setData] = useState({
        mobile_no: '',
        name: '',
        city: '',
        state: '',
        pincode: '',
        address1: ''
    });
    const navigation = useNavigation();

    const register = () => {
        const { mobile_no, name, city, state, pincode, address1 } = data;
        let url = `${BASE_URL}moneytransfer/rechargekitmsspayment/doregister?mobile_no=${mobile_no}&name=${name}&city=${city}&state=${state}&pincode=${pincode}&address1=${address1}`;
        console.log(url)
        GETNETWORK(url, true).then((res) => {
            console.log(JSON.stringify(res, null, 4));
            if (res.status == 200) {
                showMessage({
                    message: "Registration Successful",
                    type: "success",
                });
                navigation.goBack();
            } else {
                showMessage({
                    message: "Please try after some time",
                    type: "danger",
                });
            }
        })
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
                                temp.mobile_no = val;
                                setData(temp)
                            }}
                            keyboardType={'phone-pad'}
                            style={{ height: 50, borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                            placeholder={'Mobile Number'}
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
                            keyboardType={'numeric'}
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
                                register();
                            }}
                            style={{ height: 50, width: 200, backgroundColor: '#4287f5', alignSelf: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Register</Text>
                        </TouchableOpacity>
                    </View>


                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )

}

export default RemiterRegistration;