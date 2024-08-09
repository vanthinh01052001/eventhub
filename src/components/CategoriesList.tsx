import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';
import {appColors} from '../constants/appColors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TagComponent from './TagComponent';
import {IconArt, IconFood} from '../assets/svgs';

interface Props {
  isFill?: boolean;
}
interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}
const CategoriesList = (props: Props) => {
  const {isFill} = props;
  const categories: Category[] = [
    {
      key: 'sports',
      label: 'Sports',
      color: appColors.red,
      icon: (
        <FontAwesome6
          name="basketball"
          size={20}
          color={isFill ? appColors.white : appColors.red}
        />
      ),
    },
    {
      key: 'music',
      label: 'Music',
      color: appColors.orange,
      icon: (
        <FontAwesome6
          name="music"
          size={20}
          color={isFill ? appColors.white : appColors.orange}
        />
      ),
    },
    {
      key: 'food',
      label: 'Food',
      color: appColors.cyan,
      icon: <IconFood color={isFill ? appColors.white : appColors.cyan} />,
    },
    {
      key: 'art',
      label: 'Art',
      color: appColors.blue3,
      icon: <IconArt color={isFill ? appColors.white : appColors.cyan} />,
    },
  ];
  return (
    <FlatList
      style={[{paddingHorizontal: 24}]}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <TagComponent
          styles={[
            {
              marginRight: index === categories.length - 1 ? 54 : 12,
              minWidth: 82,
            },
          ]}
          bgColor={isFill ? item.color : appColors.white}
          onPress={() => {}}
          key={item.key}
          icon={item.icon}
          label={item.label}
        />
      )}
    />
  );
};

export default CategoriesList;
