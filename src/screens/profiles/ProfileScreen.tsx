import {View, Text} from 'react-native';
import React from 'react';
import {ButtonComponent} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/authReducer';
import {appColors} from '../../constants/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <ButtonComponent
        type="primary"
        textColor={appColors.white}
        text="logout"
        onPress={async () => {
          await GoogleSignin.signOut();
          await LoginManager.logOut();
          await AsyncStorage.clear();
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default ProfileScreen;
