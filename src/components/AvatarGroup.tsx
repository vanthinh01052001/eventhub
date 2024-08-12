import {View, Text, Image} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import SpaceComponent from './SpaceComponent';

const AvatarGroup = () => {
  const avtURL =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <RowComponent justify="flex-start" styles={{marginVertical: 12}}>
      {Array(3)
        .fill(0)
        .map((item, index) => (
          <Image
            key={`img-${index}`}
            source={{uri: avtURL}}
            style={{
              width: 24,
              height: 24,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColors.white,
              marginLeft: index > 0 ? -8 : 0,
            }}
          />
        ))}
      <SpaceComponent width={4} />
      <TextComponent
        text="+20 Going"
        color={appColors.primary}
        size={12}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
