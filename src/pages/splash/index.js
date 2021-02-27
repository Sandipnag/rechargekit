import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BRAND_BLUE, PURE_WHITE } from '../../constants/colors';
import { FONTFAMILY, HEIGHT, WIDTH } from '../../constants/values';
import { RIPPLE, LOGO } from '../../constants/imagepath';
import { getObjByKey } from '../../utils/Storage';
const Splash = () => {

  const navigation = useNavigation();

  useEffect(() => {
    getObjByKey('loginResponse').then((res)=>{
      setTimeout(() => {
        navigation.replace('Signin')
      }, 3000)
    })

  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: null,
          height: null,
          flex: 1,
        }}
        source={LOGO}
      />
      {/* <ImageBackground source={LOGO} style={{ width: WIDTH * .7, height: WIDTH * .7,justifyContent:'center',alignItems:'center' }}>
        <View style={styles.circle}>
          <Text style={styles.logoText}>R</Text>
        </View>
      </ImageBackground> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: BRAND_BLUE,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 48
  },
  circle: {
    width: WIDTH * .3,
    height: WIDTH * .3,
    borderRadius: 30,
    backgroundColor: BRAND_BLUE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    fontFamily: FONTFAMILY.ROCHREGULAR,
    fontSize: (WIDTH * .3) * .6,
    color: PURE_WHITE
  }
})

export default Splash;
