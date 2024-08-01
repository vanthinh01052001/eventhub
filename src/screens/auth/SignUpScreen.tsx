import React, {useState} from 'react';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Lock, Sms, User} from 'iconsax-react-native';
import ContainerComponent from '../../components/ContainerComponent';
import SocialLogin from './components/SocialLogin';

const initValues = {
  usename: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValues);
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };
  return (
    <ContainerComponent isImageBackground isScroll back>
      {/* sign up  */}
      <SectionComponent>
        <TextComponent size={24} title text="Sign up" />
        <SpaceComponent height={21} />
        {/* username  */}
        <InputComponent
          value={values.usename}
          placeholder="Full name"
          onChange={val => handleChangeValue('username', val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        {/* email  */}
        <InputComponent
          value={values.email}
          placeholder="abc@email.com"
          onChange={val => handleChangeValue('email', val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        {/* password  */}
        <InputComponent
          value={values.password}
          placeholder="Your password"
          onChange={val => handleChangeValue('password', val)}
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        {/* confirm pass  */}
        <InputComponent
          value={values.confirmPassword}
          placeholder="Confirm password"
          onChange={val => handleChangeValue('ConfirmPassword', val)}
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
      </SectionComponent>

      <SpaceComponent height={16} />
      {/* button sign in  */}
      <SectionComponent styles={[{alignItems: 'center'}]}>
        <ButtonComponent text="SIGN UP" type="primary" />
      </SectionComponent>
      {/* social login: google, facebook */}
      <SocialLogin />
      {/* Already have an account? */}
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent
            text="Already have an account?"
            styles={{marginRight: 5}}
          />
          <ButtonComponent
            type="link"
            text="Sign in"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
