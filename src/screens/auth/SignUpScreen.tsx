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

interface ErrorMessages {
  fullname?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initValues = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.fullname ||
          errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword))
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage]);

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message: any = ``;
    switch (key) {
      case 'fullname':
        if (!values.fullname) {
          message = `fullname is required!`;
        } else {
          message = '';
        }
        break;
      case 'email':
        if (!Validate.email(values.email).isValid) {
          message = `${Validate.email(values.email).error}`;
        } else {
          message = '';
        }
        break;
      case 'password':
        if (!Validate.password(values.password).isValid) {
          message = `${Validate.password(values.password).error}`;
        } else {
          message = '';
        }
        break;
      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = `ConfirmPassword is required!`;
        } else if (values.password !== values.confirmPassword) {
          message = 'Passwords do not match.';
        } else {
          message = '';
        }
        break;

      default:
        break;
    }
    data[`${key}`] = message;
    setErrorMessage(data);
  };
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };
  const handleRegister = async () => {
    const api = `/verification`;
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {
          email: values.email,
        },
        'post',
      );
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        {/* sign up  */}
        <SectionComponent>
          <TextComponent size={24} title text="Sign up" />
          <SpaceComponent height={21} />
          {/* fullname  */}
          <InputComponent
            value={values.fullname}
            placeholder="Full name"
            onChange={val => handleChangeValue('fullname', val)}
            allowClear
            affix={<User size={22} color={appColors.gray} />}
            onEnd={() => formValidator('fullname')}
          />
          {/* email  */}
          <InputComponent
            value={values.email}
            placeholder="abc@email.com"
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            onEnd={() => formValidator('email')}
          />
          {/* password  */}
          <InputComponent
            value={values.password}
            placeholder="Your password"
            onChange={val => handleChangeValue('password', val)}
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('password')}
          />
          {/* confirm pass  */}
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponent>
        {errorMessage && (
          <SectionComponent>
            {Object.keys(errorMessage).map(
              (error, index) =>
                errorMessage[`${error}`] && (
                  <TextComponent
                    key={`error${index}`}
                    text={errorMessage[`${error}`]}
                    color={appColors.danger}
                  />
                ),
            )}
          </SectionComponent>
        )}
        <SpaceComponent height={16} />
        {/* button sign in  */}
        <SectionComponent>
          <ButtonComponent
            disable={isDisable}
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
