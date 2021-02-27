import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { DARK_ASH } from '../constants/colors';

export default CustomPicker = ({placeholder,data,viewContainer, Icon}) => {
    return (
        <RNPickerSelect
            placeholder={placeholder}
            items={data}
            onValueChange={value => {
                console.log(value)
            }}
            style={{
                inputAndroid: {
                    backgroundColor: 'transparent',
                },
                viewContainer: {...viewContainer },
                inputAndroidContainer:{...viewContainer}
            }}
            // value={this.state.favSport3}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColorAndroid: 'cyan' }}
            Icon={() => {
                return <Icon />;
            }}
        />
    )
}