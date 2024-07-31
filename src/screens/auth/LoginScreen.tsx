import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View
      style={[globalStyles.container, {padding: 16, backgroundColor: 'coral'}]}>
      <Text>LoginScreen</Text>
      {/* <Button
        title="Login"
        onPress={async () =>
          await AsyncStorage.setItem('assetToken', 'ahgdugfi')
        }
      /> */}
      <ButtonComponent
        type="link"
        text="LOGIN"
        onPress={() => console.log('login')}
        icon={
          <View>
            <Text>Nrt</Text>
          </View>
        }
        iconFlex="left"
      />
    </View>
  );
};

export default LoginScreen;
