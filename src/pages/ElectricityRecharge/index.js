import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
    TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LEFT_ARROW, AIRTEL, PICKERDOWNICON } from '../../constants/imagepath';
import { COMMONSTYLES, FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { SHADE_THREE_GRAY, BRAND_BLUE, DARK_ASH, PURE_WHITE, GRAY_BLUE, BLACK_ASH } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CustomButton from '../../components/Buttons';
import SimpleListComponent from '../../components/SimpleListComponent';
import { BASE_URL } from '../../constants/url';
import { POSTNETWORK } from '../../utils/Network';
import RBSheet from "react-native-raw-bottom-sheet";
import Dropdown from '../../components/Dropdown';
import { getObjByKey, storeObjByKey } from '../../utils/Storage';
import { showMessage } from 'react-native-flash-message';
import ContentLoader from 'react-native-easy-content-loader';
import Spinner from 'react-native-loading-spinner-overlay';
export default ElectricityRecharge = ({ route }) => {

    const navigation = useNavigation();
    const [operatorList, setOperatorList] = useState(null);
    const [operator, selectOperator] = useState('Operator');
    const operatorRBSheet = useRef();
    const stateRBSheet = useRef();
    const [payobj, setPayObj] = useState({
        p1: '',
        mobile_operator: '',
        customermobileno: '',
        price: '',
        trans_pin: '',
    })

    const [history, setHistory] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [stateList, setStateList] = useState(null);
    const [operatorLoading, setOperatorLoading] = useState(false);
    const [stateName, setStateName] = useState({ name: '', id: '' });
    const [operatorName, seOperatorName] = useState('');

    useEffect(() => {
        recentTransactions();
        getStateList();
        getObjByKey('loginResponse').then((res) => {
            setPayObj({
                ...payobj,
                customermobileno: res.organization.organizations_mobile
            })
        })
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            style: {
                height: 100
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.replace('Home')
                        }}
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 15 }}>
                        <Image source={LEFT_ARROW} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        <View style={{ width: GAP.MEDIUM }} />
                        <Text style={{ fontSize: 16, color: DARK_ASH, fontWeight: 'bold' }}>
                            {route.params.headerText}
                        </Text>
                    </TouchableOpacity>
                )
            },
            headerTitle: () => null
        })
    }, [])

    const dropDownListComponent = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setPayObj({
                        ...payobj,
                        mobile_operator: item.operator_id
                    });
                    seOperatorName(item.operator_name)
                    operatorRBSheet.current.close()
                }} style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: BRAND_BLUE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: GAP.SMALL,
                    borderRadius: 10
                }}>
                <Text style={styles.dropDowntext}>
                    {item.operator_name}
                </Text>
            </TouchableOpacity>

        )
    }

    const stateListComponent = ({ item, index }) => {
        return (
            <TouchableOpacity

                onPress={() => {
                    setStateName({ id: item.StateID, name: item.StateName });
                    stateRBSheet.current.close();
                    loadOperatorList(item.StateID);
                    setOperatorLoading(true);
                    seOperatorName('');
                    setPayObj({
                        ...payobj,
                        mobile_operator:''
                    })
                }}
                style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: BRAND_BLUE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: GAP.SMALL,
                    borderRadius: 10
                }}>
                <Text style={styles.dropDowntext}>
                    {item.StateName}
                </Text>
            </TouchableOpacity>

        )
    }

    const recentTransactions = () => {
        setHistory(null);
        let obj = {
            offset: 0,
            limit: 20,
            service_id: route.params.rechargeType
        }
        POSTNETWORK(`${BASE_URL}report/servicewise`, obj, true).then((res) => {
            setLoading(false)
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
                }}
                borderColor={{ borderColor: item.borderColor, borderWidth: 2 }}
                upperText={item.operator_name}
                bottomText={item.order_customer_ref}
                rightTopText={item.order_customer_amount}
                rightBottomText={item.order_mode}
            />
        )

    }

    const getStateList = () => {
        POSTNETWORK(`${BASE_URL}statelist`, {}, true).then((res) => {
            if (res.status == 200) {
                setStateList(res.data);
            }
        })
    }

    const loadOperatorList = (stateId) => {
        let url = `${BASE_URL}billpaymentoperatorlist`;
        let postObj = { category: route.params.rechargeType, state: stateId };
        console.log("postObj", postObj)
        POSTNETWORK(url, postObj, true).then((res) => {
            console.log("loadOperatorList-->", res);
            setOperatorLoading(false)
            if (res.status == 200) {
                setOperatorList(res.data);
            }
        }).catch((err) => {
            console.log("res-->", err)
        })
    }

    const recharge = () => {
        Keyboard.dismiss();
        let flag = 0;
        for (let key in payobj) {
            if (payobj[key] == '') {
                flag = 1;
                break;
            }
        }

        if (flag == 0) {
            POSTNETWORK(`${BASE_URL}billpayment/dorecharge`, payobj, true).then((res) => {
                console.log(res);
                
                if (res.status == 200 && res.success==1) {
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
        } else {
            showMessage({
                message: "All Fields are mandatory",
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
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Spinner visible={operatorLoading} />
            <RBSheet
                ref={operatorRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={HEIGHT * .6}
                customStyles={{
                    container: {
                        backgroundColor: PURE_WHITE,
                        padding: 20
                    }
                }}
            >
                <FlatList
                    data={operatorList}
                    ListEmptyComponent={() => (<Text style={{ alignSelf: 'center' }}>No Operator found</Text>)}
                    renderItem={dropDownListComponent}
                    keyExtractor={(item, index) => index.toString()}
                />
            </RBSheet>
            <RBSheet
                ref={stateRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={HEIGHT * .6}
                customStyles={{
                    container: {
                        backgroundColor: PURE_WHITE,
                        padding: 20
                    }
                }}
            >
                <FlatList
                    data={stateList}
                    renderItem={stateListComponent}
                    keyExtractor={(item, index) => index.toString()}
                />
            </RBSheet>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, }}
                showsVerticalScrollIndicator={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, padding: 15 }}>
                        <View style={{ ...styles.history, ...COMMONSTYLES.shadow }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Dropdown
                                    containerStyle={styles.dropDownContainerStyle}
                                    label={stateName.name || 'Select State'}
                                    Icon={() => (
                                        <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
                                    )}
                                    onpressRadio={() => {
                                        stateRBSheet.current.open()
                                    }}
                                    textStyle={{
                                        fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                        fontSize: 12,
                                        color: DARK_ASH
                                    }}
                                />
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Dropdown
                                    disabled={stateName.id == ''}
                                    containerStyle={styles.dropDownContainerStyle}
                                    label={ operatorName || 'Select Operator'}
                                    Icon={() => (
                                        <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
                                    )}
                                    onpressRadio={() => { operatorRBSheet.current.open() }}
                                    textStyle={{
                                        fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                        fontSize: 12,
                                        color: DARK_ASH
                                    }}
                                />
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <TextInput
                                    placeholder={`Enter Customer Number`}
                                    style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                                    keyboardType={'default'}
                                    onChangeText={(value) => {
                                        setPayObj({
                                            ...payobj,
                                            p1: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={(value) => {
                                        setPayObj({
                                            ...payobj,
                                            customermobileno: value
                                        })
                                    }}
                                    placeholder={`Enter Customer Mobile Number`}
                                    style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50, flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={(value) => {
                                        setPayObj({
                                            ...payobj,
                                            price: value
                                        })
                                    }}
                                    placeholder={`Amount`}
                                    style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                                    keyboardType={'number-pad'}
                                />
                                {/* <View style={{ width: GAP.MEDIUM }} /> */}
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        payobj.dth_operator ?
                                            navigation.navigate('ViewBill', {
                                                operator: payobj.dth_operator,
                                                partnerId: payobj.customer_id
                                            })
                                            :
                                            Alert.alert('Please Enter Operator')

                                    }}
                                    style={{ height: '100%', justifyContent: 'center' }}>
                                    <Text style={{ color: BRAND_BLUE }}>View Bill</Text>
                                </TouchableOpacity> */}

                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <View style={{ height: 50 }}>
                                <TextInput
                                    onChangeText={(value) => {
                                        setPayObj({
                                            ...payobj,
                                            trans_pin: value
                                        })
                                    }}
                                    placeholder={`Enter Pin`}
                                    style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ height: GAP.MEDIUM }} />
                            <CustomButton
                                customStyle={{
                                    width: 70,
                                    height: 30,
                                    backgroundColor: BRAND_BLUE,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 2,
                                    alignSelf: 'center'
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
                        <View style={{ height: GAP.MEDIUM }} />
                        <View style={{ ...styles.history, ...COMMONSTYLES.shadow }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: BLACK_ASH, fontSize: WIDTH * .04, fontFamily: FONTFAMILY.ROBOTOBOLD }}>
                                    SELECT ONE FROM RECENTS
                                </Text>
                            </View>
                            {!isLoading && <FlatList
                                ListEmptyComponent={() => (<><View style={{ height: GAP.MEDIUM }} /><Text style={{ textAlign: 'center' }}>No Recent Transactions</Text></>)}
                                data={history}
                                renderItem={renderHistory}
                                keyExtractor={(item, index) => index.toString()}
                            />}
                        </View>
                        <View style={{ height: GAP.MEDIUM }} />
                        {isLoading && <View style={{ height: 200, marginHorizontal: 22 }}>

                            <View style={{ height: 60, flexDirection: 'row' }}>
                                <View style={{ flex: .15 }}>
                                    <ContentLoader
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '100%', height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: .85 }}>
                                    <ContentLoader
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '60%', height: 10 }}
                                    />
                                    <ContentLoader
                                        loading={isLoading}
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
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '100%', height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: .85 }}>
                                    <ContentLoader
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '60%', height: 10 }}
                                    />
                                    <ContentLoader
                                        loading={isLoading}
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
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '100%', height: 40 }}
                                    />
                                </View>
                                <View style={{ flex: .85 }}>
                                    <ContentLoader
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '60%', height: 10 }}
                                    />
                                    <ContentLoader
                                        loading={isLoading}
                                        active
                                        title={false}
                                        pRows={1}
                                        paragraphStyles={{ width: '90%', height: 10 }}
                                    />
                                </View>
                            </View>

                        </View>}
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
        flex: 1,

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
        color: BRAND_BLUE,
        fontFamily: FONTFAMILY.ROBOTOMEDIUM,
        fontSize: 14
    }
})