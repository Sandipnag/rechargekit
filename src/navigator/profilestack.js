import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/profile';


const Stack = createStackNavigator();

export default ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Profile" component={Profile} />
            
            
        </Stack.Navigator>
    )
}

