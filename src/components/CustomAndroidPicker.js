import React from 'react';
import { Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default CustomPicker = ({ placeholder, data, inputAndroidContainer, Icon }) => {
    return (
        <RNPickerSelect
            placeholder={{ label: 'Circle', value: null, color: DARK_ASH }}
            items={[
                { label: 'WestBengal', value: 'WestBengal' },
                { label: 'Delhi', value: 'Delhi' },
                { label: 'Kerala', value: 'Kerala' },
            ]}
            style={{
                inputAndroidContainer: {
                    borderWidth: .5,
                    justifyContent: 'center',
                    width: '40%',
                    borderColor: SHADE_THREE_GRAY,
                    height: 40
                },
                iconContainer: {
                    right: 10
                },

            }}
            // value={this.state.favSport4}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
                return <Image source={PICKERDOWNICON} style={{ width: 15, height: 15 }} />
            }}
        />
    )
}