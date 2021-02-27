import React, { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Alert,
    TextInput
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LEFT_ARROW, AIRTEL, PICKERDOWNICON } from '../../constants/imagepath';
import { COMMONSTYLES, FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { SHADE_THREE_GRAY, BRAND_BLUE, DARK_ASH, PURE_WHITE, GRAY_BLUE, BLACK_ASH } from '../../constants/colors';
import RadioGroup from '../../components/RadioGroup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import TextBox from '../../components/Textinput';
import CustomButton from '../../components/Buttons';
import SimpleListComponent from '../../components/SimpleListComponent';
import { BASE_URL } from '../../constants/url';
import { POSTNETWORK } from '../../utils/Network';
import RBSheet from "react-native-raw-bottom-sheet";
import Dropdown from '../../components/Dropdown';
import { showMessage } from "react-native-flash-message";
import { deleteByKeys, getObjByKey, storeObjByKey } from '../../utils/Storage';
import ContentLoader from 'react-native-easy-content-loader';
// import RazorpayCheckout from 'react-native-razorpay';



export default MobileRecharge = ({ route }) => {
    const navigation = useNavigation();
    const [rechargeType, setRechargeType] = useState(0);
    const [circleList, setCircleList] = useState([{ label: 'Loading', value: 'Loading' }]);
    const [operatorList, setOperatorList] = useState([{ label: 'Loading', value: 'Loading' }]);
    const [circleVal, selectCircleValue] = useState('51');
    const [operatorVal, selectOperatorValue] = useState('');
    const [operator, selectOperator] = useState('Operator');
    const [circle, selectCircle] = useState('Circle');
    const [dropdownType, setDropdownType] = useState('');
    const refRBSheet = useRef();
    var pinRef = useRef(null);
    const [mobile_no, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [trans_pin, setPin] = useState('');
    const [operatorImage, setOperatorImage] = useState(null);
    const [baseUrl, setBaseUrl] = useState('');
    const [history, setHistory] = useState(null);
    const [details, setDetails] = useState(null);
    useEffect(() => {
        recentTransactions();
        if (route.params.rechargeType == 2 || rechargeType == 2) {
            loadPostPaidCircleList();
            loadPostPaidOperatorList();
        } else {
            loadPrePaidCircleList();
            loadPrePaidOperatorList();
        }
    }, [route.params.rechargeType, rechargeType]);

    // useEffect(()=>{
    // if(route.params.amount){
    //     setAmount(route.params.amount)
    // }else{
    //     setAmount('')
    // }
    // })

    useFocusEffect(
        React.useCallback(() => {
            getObjByKey('rechargeData').then((res) => {
                // console.log(res)
                if (res) {
                    setAmount(res.amount);
                    pinRef.current.focus();
                    setDetails(res.details)
                } else {
                    setAmount('')
                }
            })
        }, [])
    );

    const loadPostPaidCircleList = () => {
        let url = `${BASE_URL}postpaidcirclelist`;
        POSTNETWORK(url, [], true).then((res) => {
            if (res.status == 200) {
                let circleList = [];
                res.data.forEach((circle, index) => {
                    let obj = {
                        label: circle.circle_name,
                        value: circle.circle_code
                    }
                    circleList.push(obj)
                });
                // console.log("loadPostPaidCircleList-->", circleList)
                setCircleList(circleList);
            }
        }).catch((err) => {
            // console.log("res-->", err)
        })
    }

    const recentTransactions = () => {
        setHistory(null);
        let obj = {
            offset: 0,
            limit: 20,
            service_id: route.params.rechargeType
        }
        POSTNETWORK(`${BASE_URL}report/servicewise`, obj, true).then((res) => {
            if (res.status == 200) {
                setHistory(res.data);
            }
        })
    }

    const renderHistory = ({ item, index }) => {
        return (
            <SimpleListComponent
                onPress={() => {
                    storeObjByKey('transaction', item).then((res) => {
                        navigation.navigate('TransactionDetails')
                    })
                    // setAmount(item.order_customer_amount);
                    // selectOperator(item.operator_name);
                    // selectCircle(item.operator_name)
                }}
                borderColor={{ borderColor: item.borderColor, borderWidth: 2 }}
                upperText={item.operator_name}
                bottomText={item.order_customer_ref}
                rightTopText={item.order_customer_amount}
                rightBottomText={item.order_mode}
            />
        )

    }

    const loadPrePaidCircleList = () => {
        let url = `${BASE_URL}circlelist`;
        POSTNETWORK(url, [], true).then((res) => {

            if (res.status == 200) {
                let circleList = [];
                res.data.forEach((circle, index) => {
                    let obj = {
                        label: circle.circle_name,
                        value: circle.circle_code
                    }
                    circleList.push(obj)
                });
                // console.log("loadPrePaidCircleList-->", circleList)
                setCircleList(circleList);
            }
        }).catch((err) => {
            // console.log("res-->", err)
        })
    }

    const loadPrePaidOperatorList = () => {
        let url = `${BASE_URL}operatorlist`;
        POSTNETWORK(url, [], true).then((res) => {
            if (res.status == 200) {
                let operatorList = [];
                setBaseUrl(res.operator_impagepath)
                res.data.forEach((circle, index) => {
                    let obj = {
                        label: circle.operator_name,
                        value: circle.operator_id,
                        icon: circle.operator_image
                    }
                    operatorList.push(obj)
                });
                setOperatorList(operatorList);
            }
        }).catch((err) => { })
    }

    const loadPostPaidOperatorList = () => {
        let url = `${BASE_URL}postpaidoperatorlist`;
        POSTNETWORK(url, [], true).then((res) => {
            if (res.status == 200) {
                let operatorList = [];
                setBaseUrl(res.operator_impagepath)
                res.data.forEach((circle, index) => {
                    let obj = {
                        label: circle.operator_name,
                        value: circle.operator_id,
                        icon: circle.operator_image
                    }
                    operatorList.push(obj)
                });
                setOperatorList(operatorList);
            }
        }).catch((err) => { })
    }

    const RECENTS = [
        {
            mobile: "9804380225",
            status: "Recharge ₹ 299 done on 25 Apr, 2020",
            icon: AIRTEL
        },
        {
            mobile: "9804380225",
            status: "Recharge ₹ 299 done on 25 Apr, 2020",
            icon: AIRTEL
        },
        {
            mobile: "9804380225",
            status: "Recharge ₹ 299 done on 25 Apr, 2020",
            icon: AIRTEL
        },
        {
            mobile: "9804380225",
            status: "Recharge ₹ 299 done on 25 Apr, 2020",
            icon: AIRTEL
        }
    ]

    useLayoutEffect(() => {
        navigation.setOptions({
            style: {
                height: 100
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            deleteByKeys(['rechargeData']).then(() => {
                                navigation.replace('Home')
                            })
                        }}
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 15 }}>
                        <Image source={LEFT_ARROW} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        <View style={{ width: GAP.MEDIUM }} />
                        <Text style={{ fontSize: 16, color: DARK_ASH, fontWeight: 'bold' }}>Mobile Recharge</Text>
                    </TouchableOpacity>
                )
            },
            headerTitle: () => null
        })
    }, [])

    const renderRecents = ({ item, index }) => {

        return (
            <SimpleListComponent
                icon={item.icon}
                upperText={item.mobile}
                bottomText={item.status}
                enableRight={false}
            />
        )

    }

    const dropDownListComponent = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                if (dropdownType == 'circle') {
                    selectCircle(item.label)
                    selectCircleValue(item.value)
                } else {
                    selectOperator(item.label)
                    selectOperatorValue(item.value)
                    setOperatorImage(baseUrl + item.icon)
                }
                refRBSheet.current.close()
            }} style={{
                height: 60,
                marginBottom: GAP.SMALL,
                borderRadius: 10,
                flexDirection: 'row',
                borderBottomWidth: 0.5
            }}>
                {item.hasOwnProperty('icon') && <View style={{ flex: .2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: baseUrl + item.icon }}
                        style={{ width: 30, height: 30 }}
                    />
                </View>}
                {item.hasOwnProperty('icon') && <View style={{ flex: .8, justifyContent: 'center' }}>
                    <Text style={styles.dropDowntext}>
                        {item.label}
                    </Text>
                </View>}
                {!item.hasOwnProperty('icon') && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.dropDowntext}>
                        {item.label}
                    </Text>
                </View>}
            </TouchableOpacity>

        )
    }

    const recharge = () => {
        let obj = {
            mobile_no: mobile_no,
            price: amount,
            recharge_type: "NORMAL",
            mobile_operator: operatorVal,
            circle_code: circleVal,
            trans_pin: trans_pin
        };
        // console.log(JSON.stringify(obj, null, 4))
        POSTNETWORK(`${BASE_URL}prepaid/dorecharge`, obj, true).then((res) => {
            if (res.status == 200) {
                showMessage({
                    message: res.msg,
                    type: "success",
                    textStyle: {
                        alignSelf: 'center',
                        textAlign: 'center'
                    },
                    titleStyle: {
                        alignSelf: 'center',
                        textAlign: 'center'
                    }
                });
                navigation.navigate('Home')
            } else {
                showMessage({
                    message: res.msg,
                    type: "danger",
                    textStyle: {
                        alignSelf: 'center',
                        textAlign: 'center'
                    },
                    titleStyle: {
                        alignSelf: 'center',
                        textAlign: 'center'
                    }
                });
            }
        })
    }

    // const recharge = () => {
    //     let headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization':`Basic ${btoa(`rzp_test_o0h5531cd9bVgw:qwOWJaIF0qOpU35TlVmK97rD`)}`,
    //     };
        
    //     return fetch('https://api.razorpay.com/v1/orders', {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify({
    //             "amount": amount * 100,
    //             "currency": "INR",
    //             // "receipt": "Receipt no. 1",
    //             // "payment_capture": 1,
    //             // "notes": {
    //             //   "notes_key_1": "Tea, Earl Grey, Hot",
    //             //   "notes_key_2": "Tea, Earl Grey… decaf."
    //             // }
    //           })
    //     })
    //         .then((response) => response.json())
    //         .then(response => {
    //             console.log(response);
    //             var options = {
    //                 description: 'Credits towards consultation',
    //                 image: 'https://i.imgur.com/3g7nmJC.png',
    //                 currency: 'INR',
    //                 key:'rzp_test_o0h5531cd9bVgw',
    //                 // key: 'MeBBdKNieKxwJVyBi8RIdT4I',
    //                 amount: '30000',
    //                 name: 'Acme Corp',
    //                 order_id: response.id,
    //                 prefill: {
    //                     email: 'gaurav.kumar@example.com',
    //                     contact: '9191919191',
    //                     name: 'Gaurav Kumar'
    //                 },
    //                 theme: { color: '#53a20e' }
    //             }
    //             RazorpayCheckout.open(options).then((data) => {
    //                 // handle success
    //                 console.log("data",data)
    //                 alert(`Success: ${data.razorpay_payment_id}`);
    //             }).catch((error) => {
    //                 // handle failure
    //                 console.log("error",error)
    //                 alert(`Error: ${error.code} | ${error.description}`);
    //             });
    //         }).catch(error => {
    //             console.error(error);
    //         });
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                    data={dropdownType == 'circle' ? circleList : operatorList}
                    renderItem={dropDownListComponent}
                    keyExtractor={(item, index) => index.toString()}
                />
            </RBSheet>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, }}
                showsVerticalScrollIndicator={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, padding: 15 }}>
                        <View style={{ ...styles.history, ...COMMONSTYLES.shadow }}>
                            <RadioGroup
                                onChangeRadioButton={(data) => {
                                    setRechargeType(data);
                                }}
                                // disableIndex={route.params.rechargeType == 0 ? 1 : 0}
                                defaultVal={route.params.rechargeType || 1}
                                outerCircle={
                                    {
                                        height: 20,
                                        width: 20,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: DARK_ASH
                                    }
                                }
                                innerCircle={
                                    {
                                        height: 10,
                                        width: 10,
                                        borderRadius: 5,
                                        backgroundColor: BRAND_BLUE
                                    }
                                }
                                data={
                                    [
                                        {
                                            label: 'Prepaid'
                                        },
                                        {
                                            label: 'Postpaid'
                                        }
                                    ]
                                }
                            />
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={(value) => {
                                        setMobile(value)
                                    }}
                                    placeholder={`Mobile Number`}
                                    style={styles.textBoxCustomStyle}
                                    keyboardType={'phone-pad'}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setDropdownType('operator')
                                        refRBSheet.current.open()
                                    }}
                                    style={{ flex: .4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                    <Text style={{ fontSize: 10, fontFamily: FONTFAMILY.ROBOTOREGULAR, color: BRAND_BLUE }}>Change</Text>
                                    {operatorImage && <Image source={{ uri: operatorImage }} style={{ width: 20, height: 20, borderRadius: 5 }} />}
                                </TouchableOpacity>

                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Dropdown
                                    containerStyle={styles.dropDownContainerStyle}
                                    label={operator.slice(0, 11)}
                                    Icon={() => (
                                        <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
                                    )}
                                    onpressRadio={() => {
                                        setDropdownType('operator')
                                        refRBSheet.current.open()
                                    }}
                                    textStyle={{
                                        fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                        fontSize: 12,
                                        color: DARK_ASH
                                    }}
                                />
                                {/* <Dropdown
                                    containerStyle={styles.dropDownContainerStyle}
                                    label={circle.slice(0, 11)}
                                    Icon={() => (
                                        <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
                                    )}
                                    onpressRadio={() => {
                                        setDropdownType('circle')
                                        refRBSheet.current.open()
                                    }}
                                    textStyle={{
                                        fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                        fontSize: 12,
                                        color: DARK_ASH
                                    }}
                                /> */}
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={(value) => {
                                        setAmount(value)
                                    }}
                                    value={amount}
                                    placeholder={`Enter Amount`}
                                    style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                                    keyboardType={'phone-pad'}
                                />
                                <View style={{ flex: .4, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
                                    <CustomButton
                                        customStyle={{
                                            width: 70,
                                            height: 30,
                                            backgroundColor: GRAY_BLUE,
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: 2
                                        }}
                                        onPress={() => {
                                            (operatorVal != '' && circleVal != '') ?
                                                navigation.navigate('MobilepLans', {
                                                    operator: operatorVal,
                                                    circle: circleVal,
                                                    operatorName: operator,
                                                    circleName: circle,
                                                }) : showMessage({
                                                    message: 'Please select operator and circle',
                                                    type: "danger",
                                                    textStyle: {
                                                        alignSelf: 'center',
                                                        textAlign: 'center'
                                                    },
                                                    titleStyle: {
                                                        alignSelf: 'center',
                                                        textAlign: 'center'
                                                    }
                                                });
                                        }}
                                        buttonText={'View Plan'}
                                        customTextStyle={
                                            {
                                                fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                                fontSize: 12,
                                                color: PURE_WHITE
                                            }
                                        }
                                    />
                                </View>
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={(value) => {
                                        setPin(value)
                                    }}
                                    ref={pinRef}
                                    placeholder={`Enter Pin Code`}
                                    style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                                    keyboardType={'phone-pad'}
                                />
                                <View style={{ flex: .4, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
                                    <CustomButton
                                        customStyle={{
                                            width: 70,
                                            height: 30,
                                            backgroundColor: BRAND_BLUE,
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: 2
                                        }}
                                        onPress={recharge}
                                        buttonText={'Recharge'}
                                        customTextStyle={
                                            {
                                                fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                                fontSize: 12,
                                                color: PURE_WHITE
                                            }
                                        }
                                    />
                                </View>
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            {details && <Text>{details}</Text>}
                        </View>
                        {/* <View style={{ height: GAP.MEDIUM }} />
                        <View style={{ ...styles.history, ...COMMONSTYLES.shadow }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: BLACK_ASH, fontSize: WIDTH * .04, fontFamily: FONTFAMILY.ROBOTOBOLD }}>
                                    SELECT ONE FROM RECENTS
                                </Text>
                            </View>
                            <FlatList
                                ListEmptyComponent={() => (<><View style={{ height: GAP.MEDIUM }} /><Text style={{ textAlign: 'center' }}>No Recent Transactions</Text></>)}
                                data={history}
                                renderItem={renderHistory}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View> */}
                        {/* <View style={{ height: GAP.MEDIUM }} /> */}
                        {/* {!history && <View style={{ height: 200, marginHorizontal: 22 }}>

                            <View style={{ height: 60, flexDirection: 'row' }}>
                                <View style={{ flex: .15 }}>
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '100%', height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: .85 }}>
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '60%', height: 10 }}
                                    />
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '90%', height: 10 }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 60, flexDirection: 'row' }}>
                                <View style={{ flex: .15 }}>
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '100%', height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: .85 }}>
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '60%', height: 10 }}
                                    />
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '90%', height: 10 }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 60, flexDirection: 'row' }}>
                                <View style={{ flex: .15 }}>
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '100%', height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: .85 }}>
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '60%', height: 10 }}
                                    />
                                    <ContentLoader
                                        loading={true}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '90%', height: 10 }}
                                    />
                                </View>
                            </View>

                        </View>} */}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    history: {
        backgroundColor: PURE_WHITE,
        borderRadius: 20,
        padding: 20
    },
    textBoxCustomStyle: {
        paddingLeft: 15,
        backgroundColor: PURE_WHITE,
        color: SHADE_THREE_GRAY,
        flex: .6,

    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'red',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    dropDownContainerStyle: {
        borderWidth: 0.5,
        borderColor: DARK_ASH,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5
    },
    dropDowntext: {

        color: SHADE_THREE_GRAY,
        fontFamily: FONTFAMILY.ROBOTOMEDIUM,
        fontSize: 14
    }
})