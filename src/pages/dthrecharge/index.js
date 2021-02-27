import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    Keyboard,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LEFT_ARROW } from '../../constants/imagepath';
import { FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { SHADE_THREE_GRAY, BRAND_BLUE, DARK_ASH, PURE_WHITE, GRAY_BLUE, BLACK_ASH } from '../../constants/colors';
import { BASE_URL } from '../../constants/url';
import { GETNETWORK, POSTNETWORK } from '../../utils/Network';
import ContentLoader from 'react-native-easy-content-loader';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../../components/Buttons';
import { showMessage } from 'react-native-flash-message';

export default DTHRecharge = ({ route }) => {

    const navigation = useNavigation();
    const [operatorList, setOperatorList] = useState([{ label: 'Loading', value: 'Loading' }]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [info, setInfo] = useState(null);
    const [payobj, setPayObj] = useState({
        customer_id: '',
        dth_operator: '',
        price: ''
    })
    const [myOperator, setMyOperator] = useState(null);
    var passOneRef = useRef(null);
    var passTwoRef = useRef(null);
    var passThreeRef = useRef(null);
    var passFourRef = useRef(null);
    const [pinOne, setPinOne] = useState('');
    const [pinTwo, setPinTwo] = useState('');
    const [pinThree, setPinThree] = useState('');
    const [pinFour, setPinFour] = useState('');
    useEffect(() => {
        loadDTHOperatorList();
    }, []);

    const loadDTHOperatorList = () => {
        let url = `${BASE_URL}dthoperatorlist`;
        POSTNETWORK(url, [], true).then((res) => {
            // console.log("res", res);
            setLoading(false);
            if (res.status == 200) {
                setOperatorList(res.data);
            }
        }).catch((err) => {
            console.log("res-->", err)
        })
    }

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
                        <Text style={{ fontSize: 16, color: DARK_ASH, fontWeight: 'bold' }}>DTH Recharge</Text>
                    </TouchableOpacity>
                )
            },
            headerTitle: () => null
        })
    }, [])

    const dthOperatorComponent = ({ item, index }) => {
        let baseUrl = `https://wldemo.rechargkit.biz/uploads/operator/`;
        return (
            <TouchableOpacity onPress={() => {
                setPayObj({
                    ...payobj,
                    dth_operator: item.operator_id
                });
                setPage(1);
                setMyOperator(item)
            }}
                style={{
                    height: 60,
                    backgroundColor: PURE_WHITE,
                    borderBottomWidth: 0.5,
                    borderBottomColor: GRAY_BLUE,
                    flexDirection: 'row'
                }}>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: WIDTH * .1, height: WIDTH * .1 }}
                        source={{ uri: `${baseUrl}${item.operator_image}` }}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={{ width: GAP.LARGE }}></View>
                <View style={{ flex: 0.8, justifyContent: 'center' }}>
                    <Text style={styles.dropDowntext}>
                        {item.operator_name}
                    </Text>
                </View>
            </TouchableOpacity>

        )
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
        payobj.trans_pin = pinOne + pinTwo + pinThree + pinFour;
        console.log('trans_pin', payobj);
        if (flag == 0) {
            POSTNETWORK(`${BASE_URL}dth/dorecharge`, payobj, true).then((res) => {
                console.log(res);

                if (res.status == 200 && res.success == 1) {
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

    const getInfo = () => {
        let url = `${BASE_URL}offer/getDTHinfo?customer_id=${payobj.customer_id}&operator_id=${payobj.dth_operator}`;
        GETNETWORK(url, true).then((res) => {
            if (res.status != 404) {
                setInfo(res.data[0]);
            }
        }).catch((err) => {
            reject(err)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                page == 0 && <Animatable.View animation="slideInRight" style={{ flex: 1, paddingVertical: 15 }}>
                    {!isLoading && <FlatList
                        data={operatorList}
                        renderItem={dthOperatorComponent}
                        keyExtractor={(item, index) => index.toString()}
                    />}
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
                </Animatable.View>
            }
            {
                page == 1 && <Animatable.View animation="slideInRight" style={{ flex: 1, padding: 15 }}>
                    <Text style={{
                        color: BRAND_BLUE,
                        fontFamily: FONTFAMILY.ROBOTOLIGHT,
                        fontSize: WIDTH * .04
                    }}>Enter Customer Id</Text>
                    <View style={{ height: GAP.LARGE }}></View>
                    <Text style={{ color: BRAND_BLUE, fontFamily: FONTFAMILY.ROBOTOTHIN, fontSize: WIDTH * .04 }}>Enter your Regsitered customer id with your {myOperator.operator_name} account </Text>
                    <View style={{ height: GAP.LARGE }}></View>
                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <TextInput
                            placeholder={`Enter Customer Id`}
                            style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                            keyboardType={'default'}
                            onChangeText={(value) => {
                                setPayObj({
                                    ...payobj,
                                    customer_id: value
                                })
                            }}
                        />
                    </View>
                    <View style={{ height: GAP.LARGE }}></View>
                    <CustomButton
                        customStyle={{
                            height: 50,
                            backgroundColor: BRAND_BLUE,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 2
                        }}
                        onPress={() => {
                            getInfo();
                        }}
                        buttonText={'Get Info'}
                        customTextStyle={
                            {
                                fontFamily: FONTFAMILY.ROBOTOLIGHT,
                                fontSize: WIDTH * .06,
                                color: PURE_WHITE,
                            }
                        }
                    />
                    <View style={{ height: 20 }} />
                    <CustomButton
                        customStyle={{
                            height: 50,
                            backgroundColor: BRAND_BLUE,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 2
                        }}
                        onPress={() => {
                            payobj.customer_id != '' ? setPage(2) : showMessage({
                                message: 'Please enter customer id',
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
                        buttonText={'CONFIRM'}
                        customTextStyle={
                            {
                                fontFamily: FONTFAMILY.ROBOTOLIGHT,
                                fontSize: WIDTH * .06,
                                color: PURE_WHITE,
                            }
                        }
                    />
                    <View style={{ marginVertical: 10 }} />
                    {!info && <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: FONTFAMILY.ROBOTOBOLD }}>No info to show</Text>}
                    {info && <View>
                        <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.ROBOTOBOLD }}>Consumer Details</Text>
                        <Text style={{ marginVertical: 5, fontWeight: 'bold' }}>Name : {info.Name}</Text>
                        <Text style={{ marginVertical: 5, fontWeight: 'bold' }}>Balance : {info.Balance}</Text>
                        <Text style={{ marginVertical: 5, fontWeight: 'bold' }}>Plan Name : {info.Plan}</Text>
                    </View>}
                </Animatable.View>
            }
            {
                page == 2 && <Animatable.View animation="slideInRight" style={{ flex: 1, padding: 15 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setPayObj({
                                customer_id: '',
                                dth_operator: '',
                                price: '',
                                trans_pin: ''
                            });
                            setPage(0)
                        }}
                        style={{ height: 100, alignItems: 'center', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={{ uri: `https://wldemo.rechargkit.biz/uploads/operator/${myOperator.operator_image}` }}
                        />
                        <View style={{ width: GAP.LARGE }}></View>
                        <View>
                            <Text>{myOperator.operator_name}</Text>
                            <Text>{payobj.customer_id}</Text>
                        </View>

                    </TouchableOpacity>
                    <View style={{ width: GAP.LARGE }}></View>
                    <View style={{ height: 50, flexDirection: 'row', borderColor: SHADE_THREE_GRAY, borderWidth: 0.5 }}>
                        <View style={{ flex: .1, justifyContent: 'center', backgroundColor: PURE_WHITE, paddingLeft: 15 }}>
                            <Text style={{ color: SHADE_THREE_GRAY, fontSize: WIDTH * .06 }}>₹</Text>
                        </View>
                        <TextInput
                            placeholder={`Enter Amount`}
                            style={{ ...styles.textBoxCustomStyle, fontSize: WIDTH * .05 }}
                            keyboardType={'numeric'}
                            onChangeText={(value) => {
                                setPayObj({
                                    ...payobj,
                                    price: value
                                })
                            }}
                        />
                    </View>
                    <View style={{ height: GAP.LARGE }}></View>
                    <CustomButton
                        customStyle={{
                            height: 50,
                            backgroundColor: BRAND_BLUE,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 2
                        }}
                        onPress={() => {
                            payobj.price != '' ? setPage(3) : showMessage({
                                message: 'Please enter amount',
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
                        buttonText={'PAY BILL'}
                        customTextStyle={
                            {
                                fontFamily: FONTFAMILY.ROBOTOLIGHT,
                                fontSize: WIDTH * .06,
                                color: PURE_WHITE,
                            }
                        }
                    />
                </Animatable.View>
            }
            {
                page == 3 && <Animatable.View animation="slideInRight" style={{ flex: 1, padding: 15 }}>
                    <Text style={{
                        color: BRAND_BLUE,
                        fontFamily: FONTFAMILY.ROBOTOLIGHT,
                        fontSize: WIDTH * .04
                    }}>Enter Your Pin</Text>
                    <View style={{ height: GAP.LARGE }}></View>
                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <TextInput
                            ref={passOneRef}
                            maxLength={1}
                            style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                            keyboardType={'default'}
                            onChangeText={(value) => {
                                setPinOne(value)
                                if (value.length == 1)
                                    passTwoRef.current.focus();
                            }}

                        />
                        <View style={{ width: GAP.SMALL }}></View>
                        <TextInput
                            maxLength={1}
                            ref={passTwoRef}
                            style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                            keyboardType={'default'}
                            onChangeText={(value) => {
                                setPinTwo(value)
                                if (value.length == 1)
                                    passThreeRef.current.focus();
                                else
                                    passOneRef.current.focus();
                            }}
                        />
                        <View style={{ width: GAP.SMALL }}></View>
                        <TextInput
                            ref={passThreeRef}
                            maxLength={1}
                            style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                            keyboardType={'default'}
                            onChangeText={(value) => {
                                setPinThree(value);
                                if (value.length == 1)
                                    passFourRef.current.focus();
                                else
                                    passTwoRef.current.focus();

                            }}
                        />
                        <View style={{ width: GAP.SMALL }}></View>
                        <TextInput
                            ref={passFourRef}
                            maxLength={1}
                            style={{ ...styles.textBoxCustomStyle, borderColor: SHADE_THREE_GRAY, borderWidth: 0.5, }}
                            keyboardType={'default'}
                            onChangeText={(value) => {
                                setPinFour(value);;
                                if (value.length == 0)
                                    passThreeRef.current.focus();
                            }}
                        />
                    </View>
                    <View style={{ height: GAP.LARGE }}></View>
                    <CustomButton
                        customStyle={{
                            height: 50,
                            backgroundColor: BRAND_BLUE,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 2
                        }}
                        onPress={() => {
                            if (pinOne && pinTwo && pinThree && pinFour) {
                                recharge()
                            } else {
                                showMessage({
                                    message: "Please Enter the pin",
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
                        }}
                        buttonText={'CONFIRM'}
                        customTextStyle={
                            {
                                fontFamily: FONTFAMILY.ROBOTOLIGHT,
                                fontSize: WIDTH * .06,
                                color: PURE_WHITE,
                            }
                        }
                    />
                </Animatable.View>
            }
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
        flex: 1
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
        fontFamily: FONTFAMILY.ROBOTOLIGHT,
        fontSize: WIDTH * .04
    }
})