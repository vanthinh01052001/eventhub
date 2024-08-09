import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {drawerCustomStyles} from '../styles/drawerCustomStyles';
import {appColors} from '../constants/appColors';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerCustom = ({navigation}: any) => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const size = 20;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpsAndFAQs',
      title: 'Helps & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];
  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    await AsyncStorage.clear();
    dispatch(removeAuth({}));
  };
  return (
    <View style={[drawerCustomStyles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Profile', {
            screen: 'ProfileScreen',
          });
        }}>
        {user.photoUrl ? (
          <Image
            source={{uri: user.photoUrl}}
            style={[drawerCustomStyles.avatar]}
          />
        ) : (
          <EvilIcons
            name="user"
            size={52}
            style={[drawerCustomStyles.avatar]}
            color={appColors.text}
          />
        )}
        <TextComponent
          text={user.name ?? user.fullname}
          title
          font={fontFamilies.medium}
        />
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={[{flex: 1, marginVertical: 20}]}
        renderItem={({item, index}) => (
          <RowComponent
            styles={[drawerCustomStyles.listItems]}
            onPress={() =>
              item.key === 'SignOut'
                ? handleSignOut()
                : () => {
                    console.log(item.key);
                    navigation.closeDrawer();
                  }
            }>
            {item.icon}
            <TextComponent
              text={item.title}
              styles={[drawerCustomStyles.listItemsText]}
            />
          </RowComponent>
        )}
      />
      <RowComponent justify="flex-start">
        <ButtonComponent
          iconFlex="left"
          icon={
            <MaterialCommunityIcons
              name="crown"
              size={22}
              color={appColors.blue1}
            />
          }
          textColor={appColors.blue1}
          text="Upgrade Pro"
          color={appColors.blue2}
          type="primary"
        />
      </RowComponent>
    </View>
  );
};

export default DrawerCustom;
