import React, {useEffect, useState} from 'react';
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
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (values.email && values.password) {
      setErrorMessage('');
    }
  }, [values.email, values.password]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };
  const handleRegister = async () => {
    const {username, email, password, confirmPassword} = values;

    if (username && email && password && confirmPassword) {
      const emailValidation = Validate.email(email);
      const passwordValidation = Validate.password(password);

      if (emailValidation.isValid && passwordValidation.isValid) {
        if (password === confirmPassword) {
          setErrorMessage('');
          setIsLoading(true);

          try {
            const res = await authenticationAPI.HandleAuthentication(
              '/register',
              {
                fullname: values.username,
                email: email,
                password: password,
              },
              'post',
            );
            dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify(res.data));
            setIsLoading(false);
          } catch (error) {
            console.log(error);
            setIsLoading(false);
          }
        } else {
          setErrorMessage('Passwords do not match.');
        }
      } else {
        if (!emailValidation.isValid) {
          setErrorMessage(emailValidation.error || 'Email validation error.');
        } else if (!passwordValidation.isValid) {
          setErrorMessage(
            passwordValidation.error || 'Password validation error.',
          );
        }
      }
    } else {
      setErrorMessage('Please enter complete information.');
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        {/* sign up  */}
        <SectionComponent>
          <TextComponent size={24} title text="Sign up" />
          <SpaceComponent height={21} />
          {/* username  */}
          <InputComponent
            value={values.username}
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
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
          />
          {/* confirm pass  */}
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
          />
        </SectionComponent>
        {errorMessage && (
          <SectionComponent>
            <TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>
        )}
        <SpaceComponent height={16} />
        {/* button sign in  */}
        <SectionComponent>
          <ButtonComponent
            onPress={handleRegister}
            text="SIGN UP"
            type="primary"
          />
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
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
