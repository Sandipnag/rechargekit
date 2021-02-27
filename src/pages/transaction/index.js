import React, { useState } from 'react';
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../constants/url';
import { POSTNETWORK } from '../../utils/Network';
import { DARK_ASH, PURE_WHITE } from '../../constants/colors';
import { BBP, CHECK } from '../../constants/imagepath';
import { storeObjByKey } from '../../utils/Storage';
import ContentLoader from 'react-native-easy-content-loader';

export default Transaction = () => {

    useFocusEffect(
        React.useCallback(() => {
            getAlltransactions();
            return () => { };
        }, [])
    );

    const [history, setHistory] = useState(null);
    const [isloading, setLoading] = useState(true);
    const navigation = useNavigation();

    const getAlltransactions = () => {
        let obj = {
            offset: 0,
            limit: 20
        }
        POSTNETWORK(`${BASE_URL}report/servicewise`, obj, true).then((res) => {
            setLoading(false);
            console.log(res)
            if (res.status == 200) {
                setHistory(res.data);
            }
        })
    }

    const renderHistory = ({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    storeObjByKey('transaction', item).then((res) => {
                        navigation.navigate('TransactionDetails')
                    })
                }}
                style={{
                    flexDirection: 'row',
                    minHeight: 100,
                    backgroundColor: PURE_WHITE,
                    paddingHorizontal: 10,
                    paddingVertical:5,
                    marginBottom: 10,
                    borderRadius: 10
                }}>
                <View style={{ flex: .2 }}>
                    {item.operator_image ?
                        <Image style={{ width: null, height: null, flex: 1, resizeMode: 'contain' }} source={{ uri: item.operator_image }} />
                        :
                        <Image style={{ width: null, height: null, flex: 1, resizeMode: 'contain' }} source={BBP} />
                    }
                </View>
                <View style={{ flex: .6, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                    <Text>{item.operator_name}</Text>
                    <Text>₹ {item.order_customer_amount}</Text>
                    <Text>{item.order_customer_ref}</Text>
                    <Text><Text style={{fontWeight:'bold'}}>Transaction Id: </Text>{item.order_partner_transaction_id}</Text>
                    <Text><Text style={{fontWeight:'bold'}}>Operator Id: </Text>{item.order_provider_transaction_id}</Text>
                    <Text>{item.order_customer_ref}</Text>
                    <Text>{item.order_date}</Text>
                </View>
                <View style={{ flex: .2,justifyContent:'center',alignItems:'center' }}>
                    <Image 
                        style={{ 
                            width: 20, 
                            height: 20,
                            tintColor:  item.order_status == 'success' ? 'green' : item.order_status == 'hold' ? 'brown' : item.order_status == 'Failed' ? 'red' : DARK_ASH
                        }} 
                        source={CHECK} 
                    />
                    {/* <Text style={{ color: item.order_status == 'success' ? 'green' : item.order_status == 'hold' ? 'blue' : item.order_status == 'Failed' ? 'red' : DARK_ASH, flexShrink: 1, fontSize: WIDTH * .03, textAlign: 'right', textTransform: 'capitalize' }}>
                        {item.order_status}
                    </Text> */}
                </View>

            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 15 }}>
                <View style={{ height: 80, marginBottom: 10 }}>
                    <Image source={BBP} style={{ width: null, height: null, flex: 1, resizeMode: 'contain' }} />
                </View>

                {!isloading && <FlatList
                    ListEmptyComponent={() => (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No transactions</Text></View>)}
                    // ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: PURE_BLACK }} />)}
                    data={history}
                    renderItem={renderHistory}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />}
                {isloading && <View style={{ height: 200, marginHorizontal: 22 }}>

                    <View style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: .15 }}>
                            <ContentLoader
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '100%', height: 40 }}
                            />
                        </View>
                        <View style={{ flex: .85 }}>
                            <ContentLoader
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '60%', height: 10 }}
                            />
                            <ContentLoader
                                loading={isloading}
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
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '100%', height: 40 }}
                            />
                        </View>
                        <View style={{ flex: .85 }}>
                            <ContentLoader
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '60%', height: 10 }}
                            />
                            <ContentLoader
                                loading={isloading}
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
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '100%', height: 40 }}
                            />
                        </View>
                        <View style={{ flex: .85 }}>
                            <ContentLoader
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '60%', height: 10 }}
                            />
                            <ContentLoader
                                loading={isloading}
                                active
                                title={false}
                                pRows={1}
                                paragraphStyles={{ width: '90%', height: 10 }}
                            />
                        </View>
                    </View>
                </View>}
            </View>
        </SafeAreaView>
    )
}