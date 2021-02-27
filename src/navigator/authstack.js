import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import signin from '../pages/signin';
import Splash from '../pages/splash';

const Stack = createStackNavigator();

export default AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />
            <Stack.Screen options={{headerShown:false}} name="Signin" component={signin} />
        </Stack.Navigator>
    )
}

