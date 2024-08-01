import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../constants/appColors';
import ContainerComponent from '../../components/ContainerComponent';
import {
  ButtonComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowCircleRight, ArrowRight, Sms} from 'iconsax-react-native';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder="abc@email.com"
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          onPress={() => navigation.navigate('Verication')}
          type="primary"
          text="Send"
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
    </ContainerComponent>
  );
};

export default ForgotPassword;
