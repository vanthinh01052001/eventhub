import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, Switch} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import ContainerComponent from '../../components/ContainerComponent';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';
import authenticationAPI from '../../apis/authApi';
import {Validate} from '../../utils/validate';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const textLogo = require('../../assets/images/img-logo.png');

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);
    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    if (email && password) {
      const emailValidation = Validate.email(email);
      const passwordValidation = Validate.password(password);
      if (emailValidation.isValid && passwordValidation.isValid) {
        setIsLoading(true);
        try {
          const res = await authenticationAPI.HandleAuthentication(
            `/login`,
            {
              email,
              password,
            },
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem(
            'auth',
            isRemember ? JSON.stringify(res.data) : '',
          );
          setIsLoading(false);
        } catch (error) {
          setErrorMessage('Email or password not correct!');
          setIsLoading(false);
        }
      } else {
        if (!emailValidation.isValid) {
          setErrorMessage(emailValidation.error || 'Email validation error.');
        } else if (!passwordValidation.isValid) {
          setErrorMessage(
            passwordValidation.error || 'Password validation error',
          );
        }
      }
    } else {
      setErrorMessage('Please enter complete information');
    }
  };
  return (
    <>
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
            placeholder="abc@email.com"
            onChange={val => setEmail(val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
          />

          {/* password  */}
          <InputComponent
            value={password}
            placeholder="Your password"
            onChange={val => setPassword(val)}
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
          />
        </SectionComponent>
        {/* display error  */}
        {errorMessage && (
          <SectionComponent>
            <TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>
        )}
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
              <SpaceComponent width={4} />
              <TextComponent styles={{marginLeft: 5}} text="Remember me" />
            </RowComponent>
            {/* forgot password  */}
            <ButtonComponent
              text="Forgot Password?"
              onPress={() => navigation.navigate('ForgotPassword')}
              type="link"
            />
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={16} />
        {/* button sign in  */}
        <SectionComponent>
          <ButtonComponent
            disable={isDisable}
            onPress={handleLogin}
            text="SIGN IN"
            type="primary"
          />
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
            <ButtonComponent
              type="link"
              text="Sign up"
              onPress={() => navigation.navigate('SignUpScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default LoginScreen;
