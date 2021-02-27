import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

export default Dropdown = ({containerStyle,label,Icon,textStyle, onpressRadio, disabled}) => {
    return(
        <TouchableOpacity 
            disabled={disabled}
            onPress={onpressRadio} 
            style={{...containerStyle,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{...textStyle}}>{label}</Text>
            <Icon />
        </TouchableOpacity>
    )
}