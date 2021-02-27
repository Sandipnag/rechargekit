import React from 'react';
import AuthStack from './authstack';
import {useDispatch, useSelector} from 'react-redux'
import TabStack from './tabstack';
import {checkuserToken} from '../redux/actions/auth';


export default Appnavigator = () => {
    const dispatch = useDispatch();
    dispatch(checkuserToken())
    const authStatus = useSelector(state => state.authStatus);
    return authStatus ? <TabStack />: <AuthStack />
    // return true ? <TabStack />: <AuthStack />
}
