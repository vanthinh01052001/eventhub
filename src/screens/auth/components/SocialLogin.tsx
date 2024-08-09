import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../../constants/appColors';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svgs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginButton,
  LoginManager,
  Profile,
  Settings,
} from 'react-native-fbsdk-next';
import {LoadingModal} from '../../../modals';
GoogleSignin.configure({
  webClientId:
    '99750319644-c7ad6f1qjqkufi4k16uo7hdmhc64aucg.apps.googleusercontent.com',
});
Settings.setAppID('2742952155874676');

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const api = `/google-signin`;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      const data = {
        fullname: user.name,
        email: user.email,
        photoUrl: user.photo,
      };
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        data,
        'post',
      );
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithFacebook = async () => {
    const api = `/facebook-signin`;
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        console.log('Login cancel');
      } else {
        const profile = await Profile.getCurrentProfile();
        if (profile) {
          setIsLoading(true);
          const data = {
            fullname: profile.name,
            email: profile.email ?? profile.userID,
            photoUrl: profile.imageURL,
          };
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <SectionComponent>
      <TextComponent
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
        styles={{textAlign: 'center'}}
      />
      <SpaceComponent height={16} />
      <ButtonComponent
        onPress={handleLoginWithGoogle}
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        icon={<Google />}
        iconFlex="left"
      />
      <ButtonComponent
        onPress={handleLoginWithFacebook}
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        textFont={fontFamilies.regular}
        text="Login with Facebook"
        icon={<Facebook />}
        iconFlex="left"
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;
