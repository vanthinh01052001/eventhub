import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles';
const imageBackground = require('../assets/images/splash-img.png');

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}
const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScroll, title, children} = props;

  const returnContainer = isScroll ? (
    <ScrollView style={[{flex: 1}]}>{children}</ScrollView>
  ) : (
    <View style={[{flex: 1}]}>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={imageBackground}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
