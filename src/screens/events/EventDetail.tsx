import {View, Text} from 'react-native';
import React from 'react';
import {appColors} from '../../constants/appColors';

const EventDetail = ({navigation, route}: any) => {
  return (
    <View>
      <Text style={{color: appColors.text, marginTop: 50}}>EventDetail</Text>
    </View>
  );
};

export default EventDetail;
