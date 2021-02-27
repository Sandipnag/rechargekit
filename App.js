import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import reduxStore from './src/redux/reduxConfig';
import Appnavigator from './src/navigator';
import FlashMessage from "react-native-flash-message";
// import QRCode from 'react-native-qrcode-svg';
const store = reduxStore();


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Appnavigator />
        <FlashMessage position="bottom" animated={true} />
      </NavigationContainer>
    </Provider>
    // <QRCode
    //   value="upi://pay?pa=8697191695@upi&pn=Xyz Nag&tn=Purchase in Merchant&tr=1234AHHCD&am=100.00&cu=INR&purpose=Test"
    // />
  );
};

export default App;
