import {View, Text} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appColors} from '../constants/appColors';
import {ArrowRight2} from 'iconsax-react-native';
import {fontFamilies} from '../constants/fontFamilies';
interface Props {
  title: string;
  onPress: () => void;
}
const TabBarComponent = (props: Props) => {
  const {title, onPress} = props;
  return (
    <RowComponent styles={{marginBottom: 20, paddingHorizontal: 16}}>
      <TextComponent text={title} title flex={1} size={18} />
      <RowComponent onPress={onPress}>
        <TextComponent text="See All" size={14} color={appColors.placeholder} />
        <ArrowRight2 size={14} color={appColors.placeholder} />
      </RowComponent>
    </RowComponent>
  );
};

export default TabBarComponent;
