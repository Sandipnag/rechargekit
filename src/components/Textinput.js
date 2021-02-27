import React from 'react';
import { TextInput } from 'react-native';
import { COMMONSTYLES } from '../constants/values';

export default TextBox = ({ placeholder, onChangeText, customStyle, keyboardType='default',onBlur, editable=true,value="" }) => {

    return (
        <TextInput
            editable={editable}
            onChangeText={(value)=>{onChangeText(value)}}
            placeholder={placeholder}
            style={{ ...customStyle }}
            returnKeyType={'done'}
            returnKeyLabel={'Next'}
            keyboardType={keyboardType}
            onBlur={onBlur}
            value={value}
        />
    )

}