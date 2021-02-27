import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { FACEBOOK_BLUE, PURE_WHITE, GOOGLE_RED } from '../constants/colors';
import { FACEBOOK_SYMBOL, GOOGLE_SYMBOL } from '../constants/imagepath';
import { GAP, WIDTH } from '../constants/values';

export default CustomButton = ({ customStyle, buttonText, customTextStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...customStyle }}>
            <Text style={{ ...customTextStyle }}>
                {buttonText}
            </Text>

        </TouchableOpacity>
    )
}

export const SocialButton = ({onPress,customStyle,type}) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={{ ...customStyle,backgroundColor:type=='fb' ? FACEBOOK_BLUE : GOOGLE_RED,paddingHorizontal:10 }}>
            <Image source={type=='fb' ? FACEBOOK_SYMBOL : GOOGLE_SYMBOL} style={{width:WIDTH * .06,height:WIDTH * .06}} />
            <View style={{width:GAP.SMALL}} />
            <Text style={{color:PURE_WHITE,fontSize:(WIDTH * .35) * .12}}>{type=='fb' ? 'Facebook' : 'Google'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})

