import {View, Text, Alert} from 'react-native';
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
import {globalStyles} from '../../styles';
import {Validate} from '../../utils/validate';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email).isValid;
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    const api = `/forgotPassword`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      console.log(res);
      Alert.alert('Send mail', 'We sent a mail includes new password!');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not create new password api forgot password, ${error}`);
    }
  };
  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <SpaceComponent height={12} />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder="abc@email.com"
          onEnd={handleCheckEmail}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          onPress={handleForgotPassword}
          type="primary"
          text="Send"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor: isDisable
                    ? appColors.gray
                    : appColors.purple,
                },
              ]}>
              <ArrowRight size={20} color={appColors.white} />
            </View>
          }
          iconFlex="right"
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPassword;
