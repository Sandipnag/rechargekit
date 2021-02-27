import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Transaction from '../pages/transaction';
import TransactionDetails from '../pages/transactiondetails';
const Stack = createStackNavigator();

export default TransactionStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:true}} name="Transaction" component={Transaction} />
            <Stack.Screen options={{headerShown:true}} name="TransactionDetails" component={TransactionDetails} />
        </Stack.Navigator>
    )
}

