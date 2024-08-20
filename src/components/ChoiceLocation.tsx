import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {globalStyles, inputStyles} from '../styles';
import {ArrowRight2, Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import CardComponent from './CardComponent';
import SpaceComponent from './SpaceComponent';
import LocationModal from '../modals/LocationModal';

const ChoiceLocation = () => {
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
  return (
    <>
      <RowComponent
        onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
        styles={[inputStyles.inpuContainer, {maxHeight: 60}]}>
        <CardComponent
          styles={[globalStyles.noSpaceCard, {width: 45, height: 45}]}
          color={appColors.purple6}>
          <CardComponent
            color={appColors.white}
            styles={[globalStyles.noSpaceCard, {width: 30, height: 30}]}>
            <Location color={appColors.primary} size={18} />
          </CardComponent>
        </CardComponent>
        <SpaceComponent width={12} />
        <TextComponent text="New York, USA" flex={1} />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>
      <LocationModal
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={val => console.log(val)}
      />
    </>
  );
};

export default ChoiceLocation;
