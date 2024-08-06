import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appColors} from '../../constants/appColors';
import ContainerComponent from '../../components/ContainerComponent';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles, verificationStyles} from '../../styles';
import {ArrowRight} from 'iconsax-react-native';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, fullname} = route.params;
  const dispatch = useDispatch();
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);
  useEffect(() => {
    let item = '';
    codeValues.forEach(val => (item += val));
    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');
    const api = `/verification`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setLimit(120);
      setCurrentCode(res.data.code);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(`Can not send verification code ${error}`);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage('Invalid Code.');
      } else {
        setErrorMessage('');
        const api = '/register';
        const data = {
          fullname,
          email,
          password,
        };
        try {
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );

          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('Email is existed!');
        }
      }
    } else {
      setErrorMessage(
        'Time out verification code, please resend new verification code.',
      );
    }
  };
  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponent height={12} />
        <TextComponent
          text={`We’ve send you the verification code on email: ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceComponent height={26} />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="space-around">
          <TextInput
            value={codeValues[0]}
            ref={ref1}
            keyboardType="number-pad"
            placeholderTextColor={appColors.gray4}
            style={[verificationStyles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 0);
              val.length > 0 ? ref2.current.focus() : ref1.current.focus();
            }}
          />
          <TextInput
            value={codeValues[1]}
            keyboardType="number-pad"
            ref={ref2}
            placeholderTextColor={appColors.gray4}
            style={[verificationStyles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 ? ref3.current.focus() : ref2.current.focus();
            }}
          />
          <TextInput
            value={codeValues[2]}
            keyboardType="number-pad"
            ref={ref3}
            placeholderTextColor={appColors.gray4}
            style={[verificationStyles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 ? ref4.current.focus() : ref3.current.focus();
            }}
          />
          <TextInput
            value={codeValues[3]}
            keyboardType="number-pad"
            ref={ref4}
            placeholderTextColor={appColors.gray4}
            style={[verificationStyles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={40} />
      <SectionComponent>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="Continue"
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.purple,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            flex={0}
            styles={[{textAlign: 'center'}]}
            color={appColors.danger}
            text={errorMessage}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in  " color={appColors.text} />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}: ${
                limit - (limit - (limit % 60))
              }`}
              color={appColors.link}
              flex={0}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend email verification"
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;
