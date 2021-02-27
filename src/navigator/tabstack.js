import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homestack from './homestack';
import { Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { TRANSACTION, HOME, WALLET, PROFILE } from '../constants/imagepath';
import { BRAND_BLUE, PURE_BLACK, PURE_WHITE } from '../constants/colors';
import { FONTFAMILY, GAP, WIDTH } from '../constants/values';
// import * as Animatable from 'react-native-animatable';
import ProfileStack from './profilestack'
import WalletStack from './walletstack';
import TransactionStack from './transactionstack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const Tab = createBottomTabNavigator();


// const MyTabBar = ({ state, descriptors, navigation }) => {
//     const focusedOptions = descriptors[state.routes[state.index].key].options;

//     if (focusedOptions.tabBarVisible === false) {
//         return null;
//     }

//     return (
//         <SafeAreaView>
//             <View style={{ flexDirection: 'row' }}>
//                 {state.routes.map((route, index) => {
//                     const { options } = descriptors[route.key];
//                     const label =
//                         options.tabBarLabel !== undefined
//                             ? options.tabBarLabel
//                             : options.title !== undefined
//                                 ? options.title
//                                 : route.name;

//                     const isFocused = state.index === index;

//                     const onPress = () => {
//                         const event = navigation.emit({
//                             type: 'tabPress',
//                             target: route.key,
//                             canPreventDefault: true,
//                         });

//                         if (!isFocused && !event.defaultPrevented) {
//                             navigation.navigate(route.name);
//                         }
//                     };

//                     const onLongPress = () => {
//                         navigation.emit({
//                             type: 'tabLongPress',
//                             target: route.key,
//                         });
//                     };

//                     return (
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             key={index}
//                             accessibilityRole="button"
//                             accessibilityState={isFocused ? { selected: true } : {}}
//                             accessibilityLabel={options.tabBarAccessibilityLabel}
//                             testID={options.tabBarTestID}
//                             onPress={onPress}
//                             onLongPress={onLongPress}
//                             style={{
//                                 backgroundColor: BRAND_BLUE,
//                                 height: WIDTH * .15,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 width: index == 2 ? '34%' : '22%',
//                                 flexDirection: 'row',
//                                 paddingHorizontal: 10
//                             }}
//                         >
//                             <View animation={isFocused ? 'rubberBand' : 'shake'} style={{
//                                 width: '100%',
//                                 height: '50%',
//                                 backgroundColor: isFocused ? PURE_WHITE : BRAND_BLUE,
//                                 flexDirection: 'row',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 borderRadius: 5,
//                                 // paddingHorizontal:2
//                             }}>
//                                 <Image source={
//                                     label == "Home" ? STOPBUTTON :
//                                         label == "Wallet" ? WALLET :
//                                             label == "Transaction" ? TRANSACTION :
//                                                 PROFILE
//                                 }
//                                     style={{
//                                         width: WIDTH * .05,
//                                         height: WIDTH * .05,
//                                         tintColor: isFocused ? BRAND_BLUE : PURE_WHITE
//                                     }}
//                                 />
//                                 <View style={{ width: GAP.VERYSMALL }} />
//                                 {isFocused && <Text style={{ color: isFocused ? BRAND_BLUE : PURE_WHITE }}>
//                                     {label}
//                                 </Text>}
//                             </View>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         </SafeAreaView>

//     );
// }


export default Tabstack = () => {
    return (

        <Tab.Navigator
            initialRouteName="Home"
            // tabBar={props => <MyTabBar {...props} />}
            tabBarOptions={{
                activeTintColor: BRAND_BLUE,
                inactiveTintColor: PURE_BLACK,
                labelStyle: {
                    fontSize: WIDTH * .03,
                    fontFamily: FONTFAMILY.ROBOTOREGULAR
                }
            }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = <Image source={HOME}
                            style={{
                                width: WIDTH * .05,
                                height: WIDTH * .05,
                                tintColor: focused ? BRAND_BLUE : PURE_BLACK
                            }}
                        />
                    } else if (route.name === 'Wallet') {
                        iconName = <Image source={WALLET}
                            style={{
                                width: WIDTH * .05,
                                height: WIDTH * .05,
                                tintColor: focused ? BRAND_BLUE : PURE_BLACK
                            }}
                        />
                    } else if (route.name === 'Transaction') {
                        iconName = <Image source={TRANSACTION}
                            style={{
                                width: WIDTH * .05,
                                height: WIDTH * .05,
                                tintColor: focused ? BRAND_BLUE : PURE_BLACK
                            }}
                        />
                    } else {
                        iconName = <Image source={PROFILE}
                            style={{
                                width: WIDTH * .05,
                                height: WIDTH * .05,
                                tintColor: focused ? BRAND_BLUE : PURE_BLACK
                            }}
                        />
                    }
                    return iconName
                },
            })}
        >
            <Tab.Screen 
                options={({ route }) => ({
                tabBarVisible: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home"

                    if (routeName != "Home") {
                        return false
                    }

                    return true
                })(route),
            })} 
            name="Home" component={homestack} />
            <Tab.Screen name="Wallet" component={WalletStack} />
            <Tab.Screen name="Transaction" component={TransactionStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
}