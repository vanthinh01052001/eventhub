import {
  View,
  Text,
  Button,
  ViewBase,
  Image,
  Switch,
  SwitchComponent,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {Lock, Sms} from 'iconsax-react-native';
import ContainerComponent from '../../components/ContainerComponent';
import SocialLogin from './components/SocialLogin';
const textLogo = require('../../assets/images/img-logo.png');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  return (
    <ContainerComponent isImageBackground isScroll>
      {/* logo  */}
      <SectionComponent
        styles={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 75,
          },
        ]}>
        <Image
          source={textLogo}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>
      {/* sign in  */}
      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={21} />
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
      </SectionComponent>
      {/* remember + forgot password  */}
      <SectionComponent>
        <RowComponent justify="space-between">
          {/* remember  */}
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary, false: appColors.gray2}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent styles={{marginLeft: 5}} text="Remember me" />
          </RowComponent>
          {/* forgot password  */}
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => {}}
            type="link"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      {/* button sign in  */}
      <SectionComponent>
        <ButtonComponent text="SIGN IN" type="primary" />
      </SectionComponent>
      {/* social login: google, facebook */}
      <SocialLogin />
      {/* don't have an account  */}
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent
            text="Don’t have an account?"
            styles={{marginRight: 5}}
          />
          <ButtonComponent type="link" text="Sign up" />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
