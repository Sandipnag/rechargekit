
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { BRAND_BLUE, GRAY_BLUE, PURE_BLACK, PURE_WHITE } from '../constants/colors';
import { FONTFAMILY, GAP, WIDTH } from '../constants/values';
import { storeStringByKey } from '../utils/Storage';
import { useNavigation } from '@react-navigation/native';
export default MobilePlan = ({ rowData = null, onPress }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {rowData && rowData.planDetailItemList.map((row, index) => (
                    <View key={index} style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10, alignItems: 'center' }} >
                        <Text style={styles.headerText}>  {row.displayName}</Text>
                        <Text style={styles.rowText}>
                            {row.displayValue == '-' ? 0 : row.displayValue}
                            {row.displayName == 'Talktime' ? ' Rs' : row.displayName == 'Data' && row.displayValue == '-' ? ' MB' : ""}
                        </Text>
                    </View>
                ))}
                <View style={{ borderWidth: 1, borderColor: BRAND_BLUE, borderRadius: 5, height: 30, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingVertical: 5 }}> ₹ {rowData.amount}</Text>
                </View>

            </View>
            <Text style={{ marginTop: 5, textAlign: 'left', fontFamily: FONTFAMILY.ROBOTOBOLD }}>{rowData.planDescription}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: PURE_WHITE,
        justifyContent: 'space-between',
        // flexDirection: 'row',
        minHeight: 80
    },
    rowText: {
        flexShrink: 1,
        textAlign: 'left',
        fontFamily: FONTFAMILY.ROBOTOREGULAR,
        fontSize: WIDTH * .04
    },
    headerText: {
        color: GRAY_BLUE,
        fontFamily: FONTFAMILY.ROBOTOREGULAR
    }
})