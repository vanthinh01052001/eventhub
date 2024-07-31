import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent, InputComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {Lock, Sms} from 'iconsax-react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View
      style={[
        globalStyles.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 28,
        },
      ]}>
      {/* email  */}
      <InputComponent
        value={email}
        placeholder="Enter your email..."
        onChange={val => setEmail(val)}
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
      />

      {/* password  */}
      <InputComponent
        value={password}
        placeholder="Enter your password..."
        onChange={val => setPassword(val)}
        isPassword
        affix={<Lock size={22} color={appColors.gray} />}
      />
    </View>
  );
};

export default LoginScreen;
