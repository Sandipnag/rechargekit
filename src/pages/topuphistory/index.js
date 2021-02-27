import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { PURE_BLACK } from '../../constants/colors';
import { BASE_URL } from '../../constants/url';
import { POSTNETWORK } from '../../utils/Network';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { LEFT_ARROW } from '../../constants/imagepath';
import { WIDTH } from '../../constants/values';

export default TopupHistory = () => {


    useEffect(() => {
        topuphistory();
    }, [])

    const [history, setHistory] = useState([])
    const [isloading, setLoading] = useState(true);

    const topuphistory = () => {
        let url = `${BASE_URL}report/organizationTopup`;
        POSTNETWORK(url, {}, true).then((res) => {
            console.log(res);
            setLoading(false)
            if (res.status == 200) {
                setHistory(res.data)
            } else {
                deleteByKeys(['loginResponse']).then(() => {
                    useDispatch(checkuserToken())
                })
            }
        })
    }
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            style: {
                height: 100
            },
            headerTitle: () => (<Text>Topup History</Text>),
            headerLeft: () => {
                return (
                    <TouchableOpacity onPress={() => { navigation.replace('Wallet') }}>
                        <Image source={LEFT_ARROW} style={{ height: WIDTH * .08, width: WIDTH * .08 }} />
                    </TouchableOpacity>
                )
            },
        })
    }, [])

    const renderHistory = ({ item, index }) => {

        return (
            <SimpleListComponent

                borderColor={{ borderColor: item.borderColor, borderWidth: 2 }}
                upperText={item.topup_from_organization}
                bottomText={item.status}
                rightTopText={item.topup_amount}
                rightBottomText={item.transfer_type}
            />
        )

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Spinner visible={isloading} />
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <FlatList
                    ListEmptyComponent={() => (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No transactions</Text></View>)}
                    ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: PURE_BLACK }} />)}
                    data={history}
                    renderItem={renderHistory}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}