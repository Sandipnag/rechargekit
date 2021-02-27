import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import TextBox from '../../components/Textinput';
import CustomButton from '../../components/Buttons';
import { BRAND_BLUE, DARK_ASH, PURE_BLACK, PURE_WHITE } from '../../constants/colors';
import { PICKERDOWNICON, HISTORY } from '../../constants/imagepath';
import { BASE_URL } from '../../constants/url';
import { FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { checkuserToken } from '../../redux/actions/auth';
import { GETNETWORK, POSTNETWORK } from '../../utils/Network';
import { deleteByKeys } from '../../utils/Storage';
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CalendarView from '../../components/Calendar';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default Wallet = () => {

    const [requestTo, setRequestTo] = useState([]);

    const [transferType, setTransferType] = useState([]);

    const [dropdownType, setDropdownType] = useState('');

    const [selectedRequest, setSelectedRequest] = useState('Select');

    const [selectedTransfer, setSelectedTransfer] = useState('Select');

    const [showCalendar, setCalendarVisible] = useState(false);

    const [wallet, setWallet] = useState({
        topup_amount: "",
        request_to: "",
        transfer_type: "",
        cheque_no: "",
        bank_name: "",
        branch_name: "",
        issue_date: ""
    })

    const refRBSheet = useRef();

    const navigation = useNavigation();

    const [isloading, setLoading] = useState(false);

    useEffect(() => {
        requestToList();
        transferTypeList();
    }, []);

    

    const requestToList = () => {

        let url = `${BASE_URL}wallet/wallet/parentList`;
        GETNETWORK(url, true).then((res) => {
            if (res.status == 200) {
                let temp = []
                res.data.forEach((rqst, index) => {
                    let obj = {
                        label: rqst.organizations_firm_name,
                        value: rqst.organizations_id
                    }
                    temp.push(obj);
                });
                setRequestTo(temp)
            } else {
                deleteByKeys(['loginResponse']).then(() => {
                    useDispatch(checkuserToken())
                })
            }
        })

    }

    const transferTypeList = () => {

        let url = `${BASE_URL}wallet/wallet/transferType`;
        GETNETWORK(url, true).then((res) => {
            if (res.status == 200) {
                let temp = []
                for (key in res.data) {
                    let obj = {
                        label: key,
                        value: res.data[key]
                    };
                    temp.push(obj)
                }
                setTransferType(temp);
            } else {
                deleteByKeys(['loginResponse']).then(() => {
                    useDispatch(checkuserToken())
                })
            }
        })

    }

    const dropDownListComponent = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (dropdownType == 'requestTo') {
                        setWallet({
                            ...wallet,
                            request_to: item.value
                        })
                        setSelectedRequest(item)
                    } else {
                        setWallet({
                            ...wallet,
                            transfer_type: item.value,
                            cheque_no: "",
                            bank_name: "",
                            branch_name: "",
                            issue_date: ""
                        })
                        setSelectedTransfer(item)
                    }
                    refRBSheet.current.close()
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
                    {item.label.replace(/_/ig, ' ')}
                </Text>
            </TouchableOpacity>

        )
    }

    const topUprequest = () => {
        setLoading(true)
        let url = `${BASE_URL}wallet/wallet/topupRequest`;
        console.log(wallet);
        Keyboard.dismiss();
        POSTNETWORK(url, wallet, true).then((res) => {
            setLoading(false)
            if (res.status == 200) {
                setWallet({
                    topup_amount: "",
                    request_to: "",
                    transfer_type: "",
                    cheque_no: "",
                    bank_name: "",
                    branch_name: "",
                    issue_date: ""
                });
                setSelectedRequest('Select');
                setSelectedTransfer('Select');
                showMessage({
                    message: res.msg,
                    type: "success",
                });
            } else {
                showMessage({
                    message: 'Please try later',
                    type: "danger",
                });
            }
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            style: {
                height: 100
            },
            headerTitle: () => (<Text>Wallet Topup</Text>),
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => { navigation.replace('TopupHistory') }}>
                        <Image source={HISTORY} style={{ height: WIDTH * .08, width: WIDTH * .08 }} />
                    </TouchableOpacity>
                )
            },
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Spinner
                visible={isloading}
            />
            <RBSheet
                ref={refRBSheet}
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
                    data={dropdownType == 'requestTo' ? requestTo : transferType}
                    renderItem={dropDownListComponent}
                    keyExtractor={(item, index) => index.toString()}
                />
            </RBSheet>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendar}
                onRequestClose={() => {
                    setCalendarVisible(false)
                }}
            >
                <View style={{ flex: 1, padding: 22, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setCalendarVisible(false)} style={{ height: 50, width: 50, alignSelf: 'flex-end' }}>
                        <Text style={{ fontFamily: FONTFAMILY.ROBOTOREGULAR, fontSize: 20, color: 'red' }}>X</Text>
                    </TouchableOpacity>
                    <CalendarView
                        onDayPress={(date) => {
                            setWallet({
                                ...wallet,
                                issue_date: date.dateString,
                            });
                            setCalendarVisible(false)
                        }}
                    />
                </View>
            </Modal>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, }}
                showsVerticalScrollIndicator={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, padding: 22 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text>Request To</Text>
                            <View style={{ width: GAP.SMALL }} />
                            <Dropdown
                                containerStyle={styles.dropDownContainerStyle}
                                label={selectedRequest.hasOwnProperty('label') ? selectedRequest.label.slice(0, 15) : 'Select'}
                                Icon={() => (
                                    <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
                                )}
                                onpressRadio={() => {
                                    setDropdownType('requestTo')
                                    refRBSheet.current.open()
                                }}
                                textStyle={{
                                    fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                    fontSize: 12,
                                    color: DARK_ASH,
                                    textTransform: 'uppercase'
                                }}
                            />
                        </View>
                        <View style={{ height: GAP.SMALL }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text>Transfer Type</Text>
                            <View style={{ width: GAP.SMALL }} />
                            <Dropdown
                                containerStyle={styles.dropDownContainerStyle}
                                label={selectedTransfer.hasOwnProperty('label') ? selectedTransfer.label.slice(0, 15).replace(/_/ig, ' ') : 'Select'}
                                Icon={() => (
                                    <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
                                )}
                                onpressRadio={() => {
                                    setDropdownType('requestType')
                                    refRBSheet.current.open()
                                }}
                                textStyle={{
                                    fontFamily: FONTFAMILY.ROBOTOREGULAR,
                                    fontSize: 12,
                                    color: DARK_ASH,
                                    textTransform: 'uppercase'
                                }}
                            />
                        </View>
                        <View style={{ height: GAP.SMALL }} />
                        <Text>Topup Amount</Text>
                        <View style={{ height: GAP.SMALL }} />
                        <TextBox
                            placeholder={'Enter Amount'}
                            customStyle={{
                                borderWidth: 1,
                                height: 50,
                                borderRadius: 5,
                                borderColor: DARK_ASH,
                                paddingLeft: 15
                            }}
                            value={wallet.topup_amount}
                            keyboardType={'decimal-pad'}
                            onChangeText={(text) => {
                                setWallet({
                                    ...wallet,
                                    topup_amount: text,
                                })
                            }}
                        />
                        <View style={{ height: GAP.SMALL }} />
                        {selectedTransfer.label == 'cash' && <>
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Bank Name</Text>
                            <View style={{ height: GAP.SMALL }} />

                            <TextBox
                                placeholder={'Enter Bank Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                value={wallet.bank_name}
                                onChangeText={(text) => {
                                    console.log(text)
                                    setWallet({
                                        ...wallet,
                                        bank_name: text,
                                    })
                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Branch Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Branch Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                value={wallet.branch_name}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        branch_name: text,
                                    })
                                }}
                            />
                        </>}

                        {selectedTransfer.label == 'cheque' && <>
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Bank Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Bank Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                value={wallet.bank_name}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        bank_name: text,
                                    })
                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Branch Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Branch Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                value={wallet.branch_name}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        branch_name: text,
                                    })
                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Cheque No</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Cheque No'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                value={wallet.cheque_no}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        cheque_no: text,
                                    })
                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Issue Date</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <CustomButton
                                onPress={() => {
                                    setCalendarVisible(true)
                                }}
                                customStyle={{
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    paddingLeft: 15,
                                    borderColor: DARK_ASH,
                                    borderWidth: 1
                                }}
                                buttonText={wallet.issue_date != '' ? wallet.issue_date : 'Issue Date'}
                                customTextStyle={{
                                    color: PURE_BLACK,
                                    fontFamily: FONTFAMILY.ROBOTOREGULAR
                                }}
                            />
                        </>}

                        {selectedTransfer.label == 'draft' && <>
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Bank Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Bank Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                value={wallet.bank_name}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        bank_name: text,
                                    })
                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Branch Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                value={wallet.branch_name}
                                placeholder={'Enter Branch Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        branch_name: text,
                                    })

                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Draft No</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                value={wallet.cheque_no}
                                placeholder={'Enter Draft No'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        cheque_no: text,
                                    })

                                }}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Issue Date</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <CustomButton
                                onPress={() => {
                                    setCalendarVisible(true)
                                }}
                                customStyle={{
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    paddingLeft: 15,
                                    borderColor: DARK_ASH,
                                    borderWidth: 1
                                }}
                                buttonText={wallet.issue_date != '' ? wallet.issue_date : 'Issue Date'}
                                customTextStyle={{
                                    color: PURE_BLACK,
                                    fontFamily: FONTFAMILY.ROBOTOREGULAR
                                }}
                            />
                        </>}

                        {selectedTransfer.label == 'rtgs' && <>
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Bank Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Bank Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        bank_name: text,
                                    })
                                }}
                                value={wallet.bank_name}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Branch Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Branch Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        branch_name: text,
                                    })
                                }}
                                value={wallet.branch_name}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>UTR No</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter UTR No'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        cheque_no: text,
                                    })

                                }}
                                value={wallet.cheque_no}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Issue Date</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <CustomButton
                                onPress={() => {
                                    setCalendarVisible(true)
                                }}
                                customStyle={{
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    paddingLeft: 15,
                                    borderColor: DARK_ASH,
                                    borderWidth: 1
                                }}
                                buttonText={wallet.issue_date != '' ? wallet.issue_date : 'Issue Date'}
                                customTextStyle={{
                                    color: PURE_BLACK,
                                    fontFamily: FONTFAMILY.ROBOTOREGULAR
                                }}
                            />
                        </>}

                        {(selectedTransfer.label == 'neft' || selectedTransfer.label == 'imps' || selectedTransfer.label == 'same bank tranfer' || selectedTransfer.label == 'testing' || selectedTransfer.label == 'incentive') && <>
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Bank Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Bank Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        bank_name: text,
                                    })
                                }}
                                value={wallet.bank_name}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Branch Name</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter Branch Name'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        branch_name: text,
                                    })
                                }}
                                value={wallet.branch_name}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Transaction No</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <TextBox
                                placeholder={'Enter transaction No'}
                                customStyle={{
                                    borderWidth: 1,
                                    height: 50,
                                    borderRadius: 5,
                                    borderColor: DARK_ASH,
                                    paddingLeft: 15
                                }}
                                onChangeText={(text) => {
                                    setWallet({
                                        ...wallet,
                                        cheque_no: text,
                                    })
                                }}
                                value={wallet.cheque_no}
                            />
                            <View style={{ height: GAP.SMALL }} />
                            <Text>Issue Date</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <CustomButton
                                onPress={() => {
                                    setCalendarVisible(true)
                                }}
                                customStyle={{
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    paddingLeft: 15,
                                    borderColor: DARK_ASH,
                                    borderWidth: 1
                                }}
                                buttonText={wallet.issue_date != '' ? wallet.issue_date : 'Issue Date'}
                                customTextStyle={{
                                    color: PURE_BLACK,
                                    fontFamily: FONTFAMILY.ROBOTOREGULAR
                                }}
                            />
                        </>}

                        <View style={{ height: GAP.LARGE }} />
                        <CustomButton
                            onPress={() => {
                                topUprequest();
                            }}
                            customStyle={{
                                height: 50,
                                backgroundColor: BRAND_BLUE,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            buttonText='Submit'
                            customTextStyle={{
                                color: PURE_WHITE,
                                fontFamily: FONTFAMILY.ROBOTOBOLD,
                                fontSize: 18
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

    dropDownContainerStyle: {
        borderWidth: 0.5,
        borderColor: DARK_ASH,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        paddingHorizontal: 5
    },
    dropDowntext: {

        color: BRAND_BLUE,
        fontFamily: FONTFAMILY.ROBOTOMEDIUM,
        fontSize: 14,
        textTransform: 'capitalize'
    }
})