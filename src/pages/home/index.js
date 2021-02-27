import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native'
import { BACKGROUND_GRAY, BRAND_BLUE, DARK_ASH, PURE_WHITE, BLACK_ASH, PURE_BLACK } from '../../constants/colors';
import {
    BATTERY,
    DISH,
    BULB,
    CYLINDER,
    POSTPAID,
    BROADBAND,
    LANDPHONE,
    DONATION,
    BLANK_USER,
    HELP,
    BELL,
    WALLET,
    PLUSICON,
    BANNER,
    TRANSACTION,
    AVATAR,
    LOGOUT,
    BANK
} from '../../constants/imagepath'
import { COMMONSTYLES, FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { useNavigation } from '@react-navigation/native';
import { FlatListSlider } from 'react-native-flatlist-slider';
import SimpleListComponent from '../../components/SimpleListComponent';
import { GETNETWORK, POSTNETWORK } from '../../utils/Network';
import { BASE_URL } from '../../constants/url';
import { deleteByKeys, getObjByKey } from '../../utils/Storage';
import { checkuserToken } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import ContentLoader from "react-native-easy-content-loader";
import AsyncStorage from '@react-native-community/async-storage';
export default Home = () => {

    const SERVICES = [
        {
            icon: BATTERY,
            backgroundColor: '#FFFBF8',
            border: '#FFD0A7',
            name: 'Mobile Recharge',
            borderColor: "#FFD0A7",
            navigateTo: 'MobileRecharge',
            serviceId: 1
        },
        // {
        //     icon: POSTPAID,
        //     backgroundColor: '#F0FFF2',
        //     border: '#FFD0A7',
        //     name: 'Mobile Postpaid',
        //     borderColor: "#8EFF9A",
        //     navigateTo: 'MobileRecharge',
        //     serviceId: 2
        // },
        {
            icon: DISH,
            backgroundColor: '#FAEFFF',
            border: '#FFD0A7',
            name: 'DTH',
            borderColor: "#E6B5FF",
            navigateTo: 'DTHRecharge',
            serviceId: 3

        },
        {
            icon: BULB,
            backgroundColor: '#F5F6FF',
            border: '#FFD0A7',
            name: 'Electricity',
            borderColor: "#AFB7FF",
            navigateTo: 'BillRecharge',
            serviceId: 4,
            headerText:'Electricity Recharge'
        },
        // {
        //     icon: BANK,
        //     backgroundColor: '#FFF5F3',
        //     border: '#FFD0A7',
        //     name: 'Bank Finance',
        //     borderColor: "#FFD0A7",
        //     navigateTo: 'BankFinance',
        //     headerText:'Bank Finance'
        // },

        // {
        //     icon: BROADBAND,
        //     backgroundColor: '#FFF4FA',
        //     border: '#FFD0A7',
        //     name: 'Insurance',
        //     borderColor: "#FFA1D5",
        //     navigateTo: 'Insurance',
        //     headerText:'Insurance'
        // },
        // {
        //     icon: LANDPHONE,
        //     backgroundColor: '#FFFBE4',
        //     border: '#FFD0A7',
        //     name: 'Boardband',
        //     borderColor: "#FFC989",
        //     navigateTo: 'BillRecharge',
        //     headerText:'Boardband Recharge'
        // },
        // {
        //     icon: BULB,
        //     backgroundColor: '#F4FFFE',
        //     border: '#FFD0A7',
        //     name: 'Metro',
        //     borderColor: "#96D8D4",
        //     navigateTo: 'BillRecharge',
        //     headerText:'Metro Recharge'
        // },
        // {
        //     icon: BULB,
        //     backgroundColor: '#F4FFFE',
        //     border: '#FFD0A7',
        //     name: 'Water',
        //     borderColor: "#96D8D4",
        //     navigateTo: 'BillRecharge',
        //     headerText:'Water Recharge'
        // },
        // {
        //     icon: BULB,
        //     backgroundColor: '#F4FFFE',
        //     border: '#FFD0A7',
        //     name: 'Cable Tv',
        //     borderColor: "#96D8D4",
        //     navigateTo: 'BillRecharge',
        //     headerText:'Cable Tv Recharge'
        // },
        // {
        //     icon: BULB,
        //     backgroundColor: '#F4FFFE',
        //     border: '#FFD0A7',
        //     name: 'Others',
        //     borderColor: "#96D8D4",
        //     navigateTo: 'BillRecharge',
        //     headerText:'Others Recharge'
        // },
    ];

    const [data, setData] = useState(null)

    const [flag, setFlag] = useState(false);

    const [isloading, setLoading] = useState(true);

    const images = [
        {
            banner: require('../../assets/images/banner.png'),
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        // {
        //     banner: require('../../assets/images/banner_one.jpg'),
        //     desc: 'Silent Waters in the mountains in midst of Himilayas',
        // },
        // {
        //     banner: require('../../assets/images/banner_two.jpg'),
        //     desc:
        //         'Red fort in India New Delhi is a magnificient masterpeiece of humans',
        // },
        // {
        //     banner: require('../../assets/images/banner_three.jpg'),
        //     desc:
        //         'Red fort in India New Delhi is a magnificient masterpeiece of humans',
        // },
    ];

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const numColumns = 4;

    useEffect(() => {
        getAlltransactions();
    }, []);


    const getOrganizationDetail = () => {
        return new Promise((resolve, reject) => {
            let url = `${BASE_URL}partner/organization/organizationdetail`;
            GETNETWORK(url, true).then((res) => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    deleteByKeys(['loginResponse']).then(() => {
                        dispatch(checkuserToken())
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }

    const getAlltransactions = async () => {
        let obj = {
            offset: 0,
            limit: 20
        }
        getOrganizationDetail().then((orgDetails) => {
            POSTNETWORK(`${BASE_URL}report/servicewise`, obj, true).then((res) => {
                setLoading(false)
                // console.log('2');
                if (res.status == 200) {
                    // console.log("getAlltransactions", res.data);
                    setData({
                        ...data,
                        organizationDetails: orgDetails,
                        history: res.data.length > 0 ? res.data : null
                    })
                }
            })
        })
    }



    const formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - (totalRows * numColumns);
        while (totalLastRow !== numColumns && totalLastRow !== 0) {
            dataList.push({ key: `blank-${totalLastRow}`, empty: true });
            totalLastRow++;
        }
        return dataList;
    }

    const renderService = ({ item, index }) => {
        if (item.empty) {
            return <View style={{
                height: 75,
                flex: 1,
                margin: 2,
                backgroundColor: 'transparent'
            }} />
        }
        return (
            <TouchableOpacity onPress={() => {
                navigation.replace(item.navigateTo, { rechargeType: item.serviceId, serviceId: item.serviceId, headerText: item.headerText })
            }} style={{
                flex: 1,
                margin: 5,
                backgroundColor: item.backgroundColor,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: item.borderColor,
                // paddingVertical: 5,
                height: 75,
                justifyContent: 'space-evenly'
            }}>

                <Image source={item.icon} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                <Text style={{
                    flexShrink: 1,
                    justifyContent: 'center',
                    fontSize: 12,
                    textAlign: 'center',
                    color: DARK_ASH,
                    fontFamily: FONTFAMILY.ROBOTOREGULAR
                }}>{item.name}</Text>
            </TouchableOpacity>
        )

    }

    const renderHistory = ({ item, index }) => {

        return (
            <SimpleListComponent
                borderColor={{ borderColor: item.borderColor, borderWidth: 2 }}
                upperText={item.operator_name}
                bottomText={item.order_customer_ref}
                rightTopText={item.order_customer_amount}
                rightBottomText={item.order_mode}
                status={item.order_status}
            />
        )

    }

    const HeaderLeftIcon = () => {
        const [data, setData] = useState(null)
        useEffect(() => {
            getObjByKey('loginResponse').then((res) => {
                setData(res)
            })
        }, [])

        return (
            <View style={{
                width: WIDTH * .4,
                height: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Image source={AVATAR} style={{ width: 30, height: 30, borderRadius: 15 }} />
                <Text style={{ color: PURE_BLACK, fontFamily: FONTFAMILY.ROBOTOREGULAR, fontSize: 14 }}>Hi,
                {data && data.organization.organizations_name}
                </Text>
            </View>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            style: {
                height: 100
            },
            headerLeft: () => (<HeaderLeftIcon />),
            headerTitle: () => null,
            headerRight: () => {
                return (
                    <View style={{
                        width: WIDTH * .4,
                        height: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        {/* <Image source={HELP} style={{ width: 30, height: 30 }} />
                        <View style={{ width: GAP.MEDIUM }} />
                        <Image source={BELL} style={{ width: 30, height: 30 }} /> */}
                        {/* <View style={{ width: GAP.MEDIUM }} /> */}
                        <TouchableOpacity onPress={()=>{
                            AsyncStorage.clear().then(() => {
                                dispatch(checkuserToken())
                            })
                        }}>
                            <Image source={LOGOUT} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={{ width: GAP.SMALL }} />
                    </View>
                )
            },
        })
    }, [])



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: BACKGROUND_GRAY }}>
                <View style={{ height: GAP.MEDIUM }} />
                <ScrollView>
                    <ContentLoader
                        loading={!data}
                        active
                        title={false}
                        pRows={1}
                        paragraphStyles={{ width: '100%', height: 100 }}
                    />
                    {data && <View style={{ ...styles.walletInfo, marginHorizontal: 22 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={WALLET} style={{ width: WIDTH * .12, height: WIDTH * .12 }} />
                            <View style={{ width: GAP.MEDIUM }} />
                            <Text style={styles.amount}>₹ {data.organizationDetails.organizations_wallet}</Text>
                        </View>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Wallet')
                        }} style={styles.addMoney}>
                            <Image source={PLUSICON} style={{ width: WIDTH * .05, height: WIDTH * .05 }} />
                            <View style={{ width: GAP.VERYSMALL }} />
                            <Text style={{ color: PURE_WHITE, fontSize: WIDTH * .05, fontFamily: FONTFAMILY.ROBOTOBOLD }}>Add</Text>
                        </TouchableOpacity>
                    </View>}
                    <View style={{ height: GAP.MEDIUM }} />
                    <Text style={{paddingLeft:20,fontSize:20,fontFamily:FONTFAMILY.ROBOTOBOLD,marginBottom:5}}>Recharge</Text>
                    <View style={{ minHeight: 50 }}>
                        <FlatList
                            data={formatData(SERVICES, numColumns)}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            renderItem={renderService}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={numColumns}
                        />
                    </View>
                    <View style={{ height: GAP.MEDIUM }} />
                    <Text style={{paddingLeft:20,fontSize:20,fontFamily:FONTFAMILY.ROBOTOBOLD,marginBottom:5}}>Bank Finance</Text>
                    <View style={{ minHeight: 50 }}>
                        <FlatList
                            data={formatData([{
                                icon: BANK,
                                backgroundColor: '#FFF5F3',
                                border: '#FFD0A7',
                                name: 'Money Transfer',
                                borderColor: "#FFD0A7",
                                navigateTo: 'BankFinance',
                                headerText:'Bank Finance'
                            }], numColumns)}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            renderItem={renderService}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={numColumns}
                        />
                    </View>
                    <View style={{ height: GAP.MEDIUM }} />
                    <View style={{ marginHorizontal: 22, height: HEIGHT * .2, borderRadius: 20, overflow: 'hidden' }}>
                        <Image source={require('../../assets/images/banner.png')} style={{width:null,height:null,flex:1,resizeMode:'stretch'}} />
                        {/* <FlatListSlider
                            data={images}
                            loop={false}
                            autoscroll={false}
                            onPress={() => { return false }}
                            contentContainerStyle={{ overflow: 'hidden' }}
                            imageKey={'banner'}
                            indicator={false}
                            local
                        /> */}
                    </View>


                    {/* <View style={{ height: GAP.MEDIUM }} /> */}
                    {/* <View style={{ ...styles.history, ...COMMONSTYLES.shadow }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: BLACK_ASH, fontSize: WIDTH * .04, fontFamily: FONTFAMILY.ROBOTOBOLD }}>
                                Recharge  & Bills Pay History
                            </Text>
                            {data && data.history && <Text onPress={() => {
                                navigation.navigate('Transaction')
                            }} style={{ color: BRAND_BLUE, fontSize: WIDTH * .04, fontFamily: FONTFAMILY.ROBOTOMEDIUM }}>
                                View All
                            </Text>}
                        </View>
                        {data && data.history &&
                            <FlatList
                                data={data && data.history}
                                renderItem={renderHistory}
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent={() => (<Text>No Recent History Found</Text>)}
                            />
                        }
                        {data && !data.history && <Text style={{ alignSelf: 'center', marginTop: GAP.MEDIUM }}>No Recent History Found</Text>}

                    </View> */}
                    {/* <View style={{ height: GAP.MEDIUM }} /> */}
                    {/* {!data && <View style={{ height: 200, marginHorizontal: 22 }}>

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
                    <View style={{ height: GAP.MEDIUM }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    walletInfo: {
        height: HEIGHT * .1,
        backgroundColor: BRAND_BLUE,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    amount: {
        color: PURE_WHITE,
        fontSize: WIDTH * .08,
        letterSpacing: 1,
        fontFamily: FONTFAMILY.ROBOTOBOLD
    },
    addMoney: {
        paddingVertical: 5,
        backgroundColor: BRAND_BLUE,
        borderWidth: 2,
        borderColor: PURE_WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 10
    },
    history: {
        flex: 1,
        backgroundColor: PURE_WHITE,
        borderRadius: 20,
        marginHorizontal: 22,
        padding: 10
    },
    bannerSlider: {
        height: HEIGHT * .15,
        borderRadius: 20,
        overflow: 'hidden'
    }
})