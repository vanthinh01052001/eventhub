import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import {appInfo} from '../constants/appInfos';
import {EventModel} from '../types/eventmodel';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import {Bookmark2, Location} from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
interface Props {
  item: EventModel;
  type: 'card' | 'list';
}
const EventItem = (props: Props) => {
  const {item, type} = props;
  const navigation: any = useNavigation();
  return (
    <CardComponent
      styles={[globalStyles.shadow, {width: appInfo.sizes.WIDTH * 0.7}]}
      onPress={() => navigation.navigate('EventDetail', {item})}>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 130, padding: 10}}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}
        source={require('../assets/images/event-img.png')}>
        <RowComponent justify="space-between">
          <CardComponent
            styles={[globalStyles.noSpaceCard]}
            color="rgba(255, 255, 255, 0.70)">
            <TextComponent
              color={appColors.red}
              font={fontFamilies.bold}
              size={18}
              text="10"
            />
            <TextComponent
              color={appColors.red}
              font={fontFamilies.semiBold}
              size={10}
              text="JUNE"
            />
          </CardComponent>
          <CardComponent
            styles={[globalStyles.noSpaceCard]}
            color="rgba(255, 255, 255, 0.70)">
            <MaterialIcons name="bookmark" size={22} color={appColors.red} />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent text={item.title} title size={18} numOfLine={1} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColors.text1} variant="Bold" />
        <SpaceComponent width={8} />
        <TextComponent
          flex={1}
          numOfLine={1}
          text={item.location.address}
          size={12}
          color={appColors.text}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
