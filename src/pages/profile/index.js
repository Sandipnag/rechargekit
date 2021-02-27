import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COMMONSTYLES, FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import TextBox from '../../components/Textinput';
import { BRAND_BLUE, PURE_WHITE, SHADE_THREE_GRAY } from '../../constants/colors';
import { getObjByKey } from '../../utils/Storage';
import { WALLET } from '../../constants/imagepath';
export default Profile = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        getObjByKey('loginResponse').then((res) => {
            setData(res)
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, }}
                showsVerticalScrollIndicator={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, padding: 22 }}>

                        <View style={{ height: GAP.LARGE }} />
                        <View style={{ ...styles.walletInfo }}>
                            <View style={{ flexDirection: 'row',alignItems:'center'}}>
                                <Image source={WALLET} style={{ width: WIDTH * .06, height: WIDTH * .06 }} />
                                <View style={{ width: GAP.MEDIUM }} />
                                <Text style={styles.amount}>₹ {data && data.organization.organizations_wallet}</Text>
                            </View>
                            <Text style={styles.organizations_no}>Organisation Number: {data && data.organization.organizations_no}</Text>
                        </View>
                        <View style={{ height: GAP.LARGE }} />
                        <>
                            <Text style={styles.labelText}>{'Email Id'}</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <View style={{ height: 50, backgroundColor: PURE_WHITE, justifyContent: 'center', paddingHorizontal: 15, ...COMMONSTYLES.shadow, borderRadius: 5 }}>
                                <Text>{data && data.organization.organizations_email}</Text>
                            </View>

                            <View style={{ height: GAP.LARGE }} />
                            <Text style={styles.labelText}>{'Phone Number'}</Text>
                            <View style={{ height: GAP.SMALL }} />
                            <View style={{ height: 50, backgroundColor: PURE_WHITE, justifyContent: 'center', paddingHorizontal: 15, ...COMMONSTYLES.shadow, borderRadius: 5 }}>
                                <Text>{data && data.organization.organizations_mobile}</Text>
                            </View>
                        </>
                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    labelText: {
        paddingLeft: 0,
        color: SHADE_THREE_GRAY,
        fontSize: 15,
        fontFamily: FONTFAMILY.ROBOTOREGULAR
    },
    textBoxCustomStyle: {
        borderRadius: 5,
        paddingLeft: 15,
        height: 50,
        backgroundColor: PURE_WHITE,
        color: SHADE_THREE_GRAY,
        flex: 1,
    },
    walletInfo: {
        height: HEIGHT * .1,
        backgroundColor: BRAND_BLUE,
        borderRadius: 15,
        justifyContent:'center',
        paddingHorizontal:15
    },
    amount: {
        color: PURE_WHITE,
        fontSize: WIDTH * .06,
        letterSpacing: 1,
        fontFamily: FONTFAMILY.ROBOTOBOLD
    },
    organizations_no: {
        color: PURE_WHITE,
        fontSize: WIDTH * .04,
        letterSpacing: 1,
        fontFamily: FONTFAMILY.ROBOTOBOLD
    },
})