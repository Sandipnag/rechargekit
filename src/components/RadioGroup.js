import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { GAP } from '../constants/values';
import * as Animatable from 'react-native-animatable';

export default RadioGroup = ({
    direction = 'row',
    data,
    innerGap = GAP.SMALL,
    outerGap = GAP.MEDIUM,
    outerCircle,
    innerCircle,
    defaultVal = 1,
    onChangeRadioButton,
    disableIndex
}) => {
    const radioData = data;
    const [radioIndex, selectedIndex] = useState(defaultVal)
    return (
        <View style={{ flexDirection: direction }}>
            {radioData.map((single, index) => {
                let space = (index < radioData.length && direction == 'row') ? { marginRight: outerGap } : { marginBottom: outerGap }
                return (
                    <TouchableOpacity
                        onPress={() => {
                            selectedIndex(index+1);
                            onChangeRadioButton(index+1);
                        }}
                        key={index}
                        disabled={index==disableIndex}
                        style={{ flexDirection: 'row', alignItems: 'center',...space }}>
                        <View style={{ ...outerCircle, justifyContent: 'center', alignItems: 'center' }}>
                            {radioIndex == (index + 1) && <Animatable.View animation={'bounceIn'} style={{ ...innerCircle }} />}
                        </View>
                        <View style={{ width: innerGap }} />
                        <Text>{single.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1
    }
})