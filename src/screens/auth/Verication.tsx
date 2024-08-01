import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../constants/appColors';
import ContainerComponent from '../../components/ContainerComponent';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowCircleRight, ArrowRight, Sms} from 'iconsax-react-native';
const initValues = {
  OTP1: '1',
  OTP2: '2',
  OTP3: '3',
  OTP4: '4',
};
const Verication = () => {
  const [values, setValues] = useState(initValues);
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };
  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <TextComponent text="We’ve send you the verification code on +1 2620 0323 7631" />
        <SpaceComponent height={26} />
        <RowComponent justify="space-between">
          <InputComponent
            otp
            value={values.OTP1}
            onChange={val => handleChangeValue('op1', val)}
            placeholder="-"
          />
          <InputComponent
            otp
            value={values.OTP2}
            onChange={val => handleChangeValue('op2', val)}
            placeholder="-"
          />
          <InputComponent
            otp
            value={values.OTP3}
            onChange={val => handleChangeValue('op3', val)}
            placeholder="-"
          />
          <InputComponent
            otp
            value={values.OTP4}
            onChange={val => handleChangeValue('op4', val)}
            placeholder="-"
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          type="primary"
          text="Continue"
          icon={
            <ArrowRight
              size={20}
              color={appColors.white}
              style={[
                {
                  padding: 15,
                  backgroundColor: appColors.purple,
                  borderRadius: 100,
                },
              ]}
            />
          }
          iconFlex="right"
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Re-send code in  " />
          <TextComponent text="0:20" color={appColors.primary} />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default Verication;
