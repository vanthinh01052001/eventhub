import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles';
import {RowComponent, TextComponent} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
interface Props {
  visible: boolean;
  mess?: string;
}
const LoadingModal = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal
      visible={visible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: appColors.overflow,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RowComponent>
          <ActivityIndicator
            color={appColors.white}
            size={32}
            style={[
              {
                marginRight: 5,
              },
            ]}
          />
          <TextComponent
            font={fontFamilies.medium}
            text="Loading ..."
            flex={0}
            color={appColors.white}
          />
        </RowComponent>
      </View>
    </Modal>
  );
};

export default LoadingModal;
