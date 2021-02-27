import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Wallet from '../pages/wallet';
import TopupHistory from '../pages/topuphistory';

const Stack = createStackNavigator();

export default WalletStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:true}} name="Wallet" component={Wallet} />
            <Stack.Screen options={{headerShown:true}} name="TopupHistory" component={TopupHistory} />
        </Stack.Navigator>
    )
}

