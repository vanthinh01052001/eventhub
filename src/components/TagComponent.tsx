import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}
const TagComponent = (props: Props) => {
  const {onPress, label, icon, textColor, bgColor, styles} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {backgroundColor: bgColor ? bgColor : appColors.white},
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        font={fontFamilies.medium}
        text={label}
        styles={[{marginLeft: icon ? 8 : 0}]}
        color={
          textColor ? textColor : bgColor ? appColors.white : appColors.gray
        }
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
