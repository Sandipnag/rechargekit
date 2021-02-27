import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/home';
import Mobilerecharge from '../pages/mobilerecharge';
import MobilepLans from '../pages/mobileplans';
import DTHRecharge from '../pages/dthrecharge';
import ViewBill from '../pages/viewbill';
import TransactionDetails from '../pages/transactiondetails';
import ElectricityRecharge from '../pages/ElectricityRecharge';
import BankFinance from '../pages/bankFinance';
import MoneyTransfer from '../pages/moneyTransfer';
import RemiterRegistration from '../pages/remiterRegistration';
import AddBeneficiary from '../pages/addBeneficiary';
import Transfer from '../pages/transfer';

const Stack = createStackNavigator();

export default HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:true}} name="Home" component={Home} />
            <Stack.Screen options={{headerShown:true}} name="MobileRecharge" component={Mobilerecharge} />
            <Stack.Screen options={{headerShown:false,gestureEnabled:false}} name="MobilepLans" component={MobilepLans} />
            <Stack.Screen options={{headerShown:true,gestureEnabled:false}} name="DTHRecharge" component={DTHRecharge} />
            <Stack.Screen options={{headerShown:true,gestureEnabled:false}} name="ViewBill" component={ViewBill} />
            <Stack.Screen options={{headerShown:true}} name="TransactionDetails" component={TransactionDetails} />
            <Stack.Screen options={{headerShown:true}} name="BillRecharge" component={ElectricityRecharge} />
            <Stack.Screen options={{headerShown:true}} name="BankFinance" component={BankFinance} />
            <Stack.Screen options={{headerShown:true}} name="MoneyTransfer" component={MoneyTransfer} />
            <Stack.Screen options={{headerShown:true}} name="RemiterRegistration" component={RemiterRegistration} />
            <Stack.Screen options={{headerShown:true}} name="AddBeneficiary" component={AddBeneficiary} />
            <Stack.Screen options={{headerShown:true}} name="Transfer" component={Transfer} />
        </Stack.Navigator>
    )
}

