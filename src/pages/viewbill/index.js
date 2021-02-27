import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import { FACEBOOK_BLUE, GRAY_BLUE, PURE_WHITE, SHADE_THREE_GRAY } from '../../constants/colors';
import { COMMONSTYLES, FONTFAMILY, GAP, WIDTH } from '../../constants/values';
import { useNavigation } from '@react-navigation/native';
import { GETNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';

export default ViewBill = ({ route }) => {

    const navigation = useNavigation();
    const { operator, partnerId } = route.params;
    const [bill, setBill] = useState(null)


    useEffect(() => {
        getBill();
    }, []);

    const getBill = () => {
        console.log(`${BASE_URL}partner/organization/viewbill?operator_code=${operator}&p1=${partnerId}`)
        GETNETWORK(`${BASE_URL}partner/organization/viewbill?operator_code=${operator}&p1=${partnerId}`, true)
            .then((res) => {
                console.log("DTH",res)
                if (res.status == 200)
                    setBill(res.data)
            })
    }
    const HEADER = ['Gross Amount', 'Net Amount', 'BILLDATE', 'DUEDATE']
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.conatiner}>
                {/* {bill && <>
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOBOLD, fontSize: WIDTH * .05 }}>Gross Amount</Text>
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOMEDIUM, fontSize: WIDTH * .05 }}>{bill && bill[0].BILLAMOUNT}</Text>
                    <View style={{ height: GAP.LARGE }} />
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOBOLD, fontSize: WIDTH * .05 }}>Net Amount</Text>
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOMEDIUM, fontSize: WIDTH * .05 }}>{bill && bill[0].BILLNETAMOUNT}</Text>
                    <View style={{ height: GAP.LARGE }} />
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOBOLD, fontSize: WIDTH * .05 }}>Net Amount</Text>
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOMEDIUM, fontSize: WIDTH * .05 }}>{bill && bill[0].BILLNETAMOUNT}</Text>
                    <View style={{ height: GAP.LARGE }} />
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOBOLD, fontSize: WIDTH * .05 }}>BILL DATE</Text>
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOMEDIUM, fontSize: WIDTH * .05 }}>{bill && bill[0].BILLDATE}</Text>
                    <View style={{ height: GAP.LARGE }} />
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOBOLD, fontSize: WIDTH * .05 }}>DUEDATE</Text>
                    <Text style={{ fontFamily: FONTFAMILY.ROBOTOMEDIUM, fontSize: WIDTH * .05 }}>{bill && bill[0].DUEDATE}</Text>
                </>}
                {!bill && <Text style={{alignSelf:'center',fontFamily: FONTFAMILY.ROBOTOMEDIUM, fontSize: WIDTH * .05}}>No bill Found</Text>} */}
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 15
    },
    crossIcon: {
        right: 15,
        top: 15
    },
    browsePlan: {
        color: FACEBOOK_BLUE,
        fontFamily: FONTFAMILY.ROBOTOMEDIUM,
        fontSize: WIDTH * .05
    },
    operatorCircle: {
        color: GRAY_BLUE,
        fontFamily: FONTFAMILY.ROBOTOREGULAR,
        fontSize: WIDTH * .05,
        paddingHorizontal: 15,
    },
    textContainer: {
        height: 50,
        backgroundColor: PURE_WHITE,
        borderRadius: 5,
        ...COMMONSTYLES.shadow,
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    planTypetext: {
        fontFamily: FONTFAMILY.ROBOTOREGULAR,
        fontSize: 15,
        marginRight: 30,
        color: GRAY_BLUE
    },
    planTypeContainer: {
        height: 40,
        alignItems: 'center',
        backgroundColor: PURE_WHITE,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: SHADE_THREE_GRAY
    }
})