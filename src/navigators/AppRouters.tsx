import {View, Text} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';

const AppRouters = () => {
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isShowSplash, setIsShowSplash] = useState(true);

  const checkLogin = useCallback(async () => {
    try {
      const res = await getItem();
      if (res) {
        dispatch(addAuth(JSON.parse(res)));
      }
    } catch (error) {}
  }, [dispatch, getItem]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
      checkLogin();
    }, 1500);
    return () => clearTimeout(timeout);
  }, [checkLogin]);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accessToken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
