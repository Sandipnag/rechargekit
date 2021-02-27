import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import { FACEBOOK_BLUE, GRAY_BLUE, PURE_WHITE, SHADE_THREE_GRAY } from '../../constants/colors';
import { CROSS, MAGNIFY } from '../../constants/imagepath';
import { COMMONSTYLES, FONTFAMILY, GAP, WIDTH } from '../../constants/values';
import TextBox from '../../components/Textinput';
import MobilePlan from '../../components/MobilePlan';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GETNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';
import Spinner from 'react-native-loading-spinner-overlay';
import { storeObjByKey } from '../../utils/Storage';

export default MobilepLans = ({ route }) => {

    const navigation = useNavigation();
    const { operator, circle, circleName, operatorName } = route.params;
    const [isloading, setLoading] = useState(true)
    const [planType, setPlanType] = useState(null);
    const [filterPlan, setFilterPlan] = useState(null);
    const [selectedPlan, selectPlan] = useState(0);
    const [allPlan, setAllPlan] = useState(null);
    const [searchtext, setSearchText] = useState('');

    const rechargeAmount = (item)=>{
        storeObjByKey('rechargeData',{ amount: "" + item.amount, details: item.planDescription} ).then(() => {
            navigation.navigate('MobileRecharge')
        })
    }

    const renderPlan = ({ item, index }) => {
        return (
            <MobilePlan onPress={()=>rechargeAmount(item)} rowData={item} />
        )
    }

    const renderPlantype = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    selectPlan(index)
                }}
                style={{ padding: 10, borderBottomColor: GRAY_BLUE, borderBottomWidth: selectedPlan == index ? 1 : 0 }}>
                <Text>{item.planName}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getTariffPlans();
    }, []);

    const getTariffPlans = () => {
        let planName = [];
        GETNETWORK(`${BASE_URL}partner/organization/tarrifPlans?operator_code=${operator}&circle_code=${circle}`, true)
            .then((res) => {
                setLoading(false)
                if (res.status == 200) {
                    setAllPlan(res.data);
                    res.data.forEach((single) => {
                        planName.push({ planType: single.planType, planName: single.planName })
                    })
                    setPlanType(planName);
                }
            })
    }

    useEffect(() => {
        if (allPlan && allPlan.length > 0) {
            let filteredPlans = [];
            allPlan[selectedPlan].planDetailItem.forEach((plan) => {
                filteredPlans.push(plan)
            })
            setFilterPlan(filteredPlans);
        }
    }, [allPlan, selectedPlan]);

    useEffect(() => {
        if (allPlan && searchtext.length > 0) {
            let filteredPlans = allPlan[selectedPlan].planDetailItem.filter((plan) => {
                return (plan.amount == searchtext)
                    ||
                    (plan.planDescription.toLowerCase().includes(searchtext.toLowerCase()) == true);
            })
            setFilterPlan(filteredPlans);
        } else if(allPlan) {
            let filteredPlans = [];
            allPlan[selectedPlan].planDetailItem.forEach((plan) => {
                filteredPlans.push(plan)
            })
            console.log('filteredPlans', filteredPlans)
            setFilterPlan(filteredPlans);
        }
    }, [searchtext])

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.conatiner}>
                <Spinner visible={isloading} />
                <View style={{ height: GAP.MEDIUM }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={styles.browsePlan}>Browse Plans</Text>
                    <TouchableOpacity onPress={() => { 
                        navigation.navigate('MobileRecharge') 
                    }}>
                        <Image source={CROSS} style={{ width: 30, height: 30, }} />
                    </TouchableOpacity>

                </View>

                <View style={{ height: GAP.VERYSMALL }} />
                <Text style={styles.operatorCircle}>for {operatorName} - {circleName}</Text>
                <View style={{ height: GAP.MEDIUM }} />
                <View style={styles.textContainer}>
                    <View style={{ flex: .1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={MAGNIFY} style={{ width: 20, height: 20 }} />
                    </View>
                    <View style={{ flex: .9 }}>
                        <TextInput
                            onChangeText={(text) => { setSearchText(text) }}
                            placeholder={`Search for plan or enter amount`}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <View style={{ height: GAP.MEDIUM }} />
                <View>
                    {planType && <FlatList
                        contentContainerStyle={styles.planTypeContainer}
                        data={planType}
                        horizontal
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        pagingEnabled={true}
                        ItemSeparatorComponent={() => (<View style={{ width: GAP.MEDIUM }}></View>)}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderPlantype}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </View>

                <View style={{ height: GAP.VERYSMALL }} />

                <View style={{ flex: 1 }}>
                    {filterPlan && <FlatList
                        data={filterPlan}
                        ItemSeparatorComponent={() => (<View style={{ height: GAP.SMALL }} />)}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderPlan}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                    {!filterPlan && !isloading && <Text style={{ alignSelf: 'center', fontFamily: FONTFAMILY.ROBOTOBOLD, fontSize: WIDTH * .05 }}>
                        No plan to Show
                    </Text>}
                </View>
                <View style={{ height: GAP.LARGE }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
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