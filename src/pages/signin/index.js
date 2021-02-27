import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TextInput, Image } from 'react-native';
import { BRAND_BLUE, FACEBOOK_BLUE, PURE_WHITE, SHADE_THREE_GRAY } from '../../constants/colors';
import CustomButton, { SocialButton } from '../../components/Buttons';
import { COMMONSTYLES, FONTFAMILY, GAP, HEIGHT, WIDTH } from '../../constants/values';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import { checkuserToken } from '../../redux/actions/auth';
import { Formik } from 'formik';
import * as yup from 'yup';
import { POSTNETWORK } from '../../utils/Network'
import { BASE_URL } from '../../constants/url';
import { LOGO } from '../../constants/imagepath';
import { storeObjByKey } from '../../utils/Storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';


export default Signin = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const signin = (loginData) => {
        Keyboard.dismiss();
        setLoading(true);
        let loginUrl = `${BASE_URL}partner/organization/dologin`;
        console.log(loginUrl);
        console.log(loginData);
        POSTNETWORK(loginUrl, loginData).then((res) => {
            setLoading(false);
            if (res.hasOwnProperty('status') && res.status == 200) {
                showMessage({
                    message: "Login Successful",
                    type: "success",
                });
                storeObjByKey("loginResponse", res).then(() => {
                    dispatch(checkuserToken())
                })
            } else {
                showMessage({
                    message: "Please check your credentials",
                    type: "danger",
                });
            }
        }).catch((err) => {
            showMessage({
                message: "Please check your network",
                type: "danger",
            });
        })
    }

    // useEffect(()=>{
    //     dispatch(checkuserToken())
    // })


    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={isLoading}
            />
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, }}
                showsVerticalScrollIndicator={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, padding: 22 }}>
                        <View style={styles.circle}>
                            {/* <Text style={styles.logoText}>R</Text> */}
                            <Image
                                style={{
                                    width: null,
                                    height: null,
                                    flex: 1,
                                }}
                                source={LOGO}
                            />
                        </View>
                        <View style={{ height: GAP.LARGE }} />
                        <Formik
                            initialValues={{ member_no: '', password: '' }}
                            onSubmit={values => signin(values)}
                            validationSchema={yup.object().shape({
                                member_no: yup
                                    .string()
                                    .required(),
                                password: yup
                                    .string()
                                    .required(),
                            })}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <>
                                    <Text style={styles.labelText}>{'Member Number'}</Text>
                                    <View style={{ height: GAP.SMALL }} />
                                    <View style={{ height: 50 }}>
                                        <TextInput
                                            onChangeText={handleChange('member_no')}
                                            placeholder={`Member Number`}
                                            style={{ ...styles.textBoxCustomStyle, ...COMMONSTYLES.shadow }}
                                            onBlur={() => setFieldTouched('member_no')}
                                        />
                                    </View>
                                    {touched.member_no && errors.member_no &&
                                        <Text style={{
                                            fontSize: 12,
                                            marginVertical: GAP.SMALL,
                                            color: 'red',
                                            textTransform: 'uppercase',
                                            alignSelf: 'center'
                                        }}>{errors.member_no}</Text>
                                    }
                                    <View style={{ height: GAP.LARGE }} />
                                    <Text style={styles.labelText}>{'Password'}</Text>
                                    <View style={{ height: GAP.SMALL }} />
                                    <View style={{ height: 50 }}>
                                        <TextInput
                                            placeholder={`Password`}
                                            style={{ ...styles.textBoxCustomStyle, ...COMMONSTYLES.shadow }}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => setFieldTouched('password')}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={{
                                            fontSize: 12,
                                            marginVertical: GAP.SMALL,
                                            color: 'red',
                                            textTransform: 'uppercase',
                                            alignSelf: 'center'
                                        }}>{errors.password}</Text>
                                    }
                                    <View style={{ height: GAP.MEDIUM }} />
                                    <CustomButton
                                        onPress={handleSubmit}
                                        customTextStyle={styles.customTextStyle}
                                        customStyle={styles.buttonStyle}
                                        buttonText={`Signin`}
                                    />
                                </>
                            )}
                        </Formik>


                        <View style={{ height: GAP.MEDIUM }} />
                        <Text style={[styles.labelText, { alignSelf: 'center' }]}>{'Forgot Password'}</Text>
                        <View style={{ height: GAP.MEDIUM }} />
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SocialButton
                                type={'fb'}
                                customStyle={styles.socialButton}
                            />
                            <SocialButton
                                type={'google'}
                                customStyle={styles.socialButton}
                            />
                        </View> */}
                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    circle: {
        width: WIDTH * .3,
        height: WIDTH * .3,
        borderRadius: (WIDTH * .3) / 2,
        backgroundColor: BRAND_BLUE,
        overflow:'hidden',
        alignSelf: 'center',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    logoText: {
        fontFamily: FONTFAMILY.ROCHREGULAR,
        fontSize: (WIDTH * .3) * .6,
        color: PURE_WHITE
    },
    inner: {
        padding: 24,
        flex: 1,
    },
    textBoxCustomStyle: {
        borderRadius: 25,
        paddingLeft: 15,
        height: 50,
        backgroundColor: PURE_WHITE,
        color: SHADE_THREE_GRAY,
        flex: 1,
    },
    buttonStyle: {
        height: 50,
        backgroundColor: BRAND_BLUE,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customTextStyle: {
        fontSize: WIDTH * .05,
        color: PURE_WHITE,
        letterSpacing: 1,
        fontFamily: FONTFAMILY.ROBOTOREGULAR,
    },
    labelText: {
        paddingLeft: 0,
        color: SHADE_THREE_GRAY,
        fontSize: 15,
        fontFamily: FONTFAMILY.ROBOTOREGULAR
    },
    socialButton: {
        width: WIDTH * .35,
        paddingVertical: 10,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
    }
})