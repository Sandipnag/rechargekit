import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { DARK_ASH, PURE_WHITE } from '../constants/colors';
import { BATTERY } from '../constants/imagepath';
import { FONTFAMILY, GAP, WIDTH } from '../constants/values';

export default SimpleListComponent = ({
    onPress,
    borderColor = {},
    icon,
    upperText,
    bottomText,
    rightTopText,
    rightBottomText,
    enableRight = true,
    status
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                marginVertical: 5,
                paddingVertical: 5,
                flexDirection: 'row',
                minHeight: 60
            }}>
            <View style={{ flex: .2, justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{
                    height: 40,
                    width: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    ...borderColor
                }}>
                    <Image source={BATTERY} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                </View>
            </View>
            <View style={{ flex: enableRight ? .5 : 1, justifyContent: 'center' }}>
                <Text style={{ color: DARK_ASH, flexShrink: 1, textAlign: 'left', fontFamily: FONTFAMILY.ROBOTOREGULAR }}>
                    {upperText}
                </Text>
                <Text style={{ color: DARK_ASH, textAlign: 'left', fontFamily: FONTFAMILY.ROBOTOREGULAR }}>
                    {bottomText}
                </Text>
            </View>
            {enableRight && <View style={{ flex: .3, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={{ color: DARK_ASH, textAlign: 'right', flexShrink: 1, fontFamily: FONTFAMILY.ROBOTOBOLD }}>
                    {rightTopText}
                </Text>
                <Text style={{ color: DARK_ASH, flexShrink: 1, fontSize: WIDTH * .03, textAlign: 'right' }}>
                    {rightBottomText}
                </Text>
                <View style={{ height: GAP.SMALL }}></View>
                <View>
                    <Text style={{ color: status == 'success' ? 'green' : status == 'hold' ? 'blue' : status == 'Failed' ? 'red' : DARK_ASH, flexShrink: 1, fontSize: WIDTH * .03, textAlign: 'right', textTransform: 'capitalize' }}>
                        {status}
                    </Text>
                </View>
                {/* <View style={{ height: 30, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: status == 'success' ? 'green' : status == 'hold' ? 'blue' : status == 'Failed' ? 'red' : DARK_ASH }}>
                    <Text style={{ color: PURE_WHITE, flexShrink: 1, fontSize: WIDTH * .03, textAlign: 'right', textTransform: 'capitalize' }}>
                        {status}
                    </Text>
                </View> */}

            </View>}
        </TouchableOpacity>
    )
}