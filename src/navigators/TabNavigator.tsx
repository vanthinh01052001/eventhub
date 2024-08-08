import {View, Text, Platform} from 'react-native';
import React, {ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddNewScreen, HomeScreen} from '../screens';
import ExploreNavigator from './ExploreNavigator';
import EventNavigator from './EventNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../constants/appColors';
import {AddSquare, Calendar, Home2, Setting, User} from 'iconsax-react-native';
import {CircleComponent, TextComponent} from '../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../styles';
import DrawerNavigator from './DrawerNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray5;
          size = 23;
          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcons name="explore" size={size} color={color} />;
              break;
            case 'Events':
              icon = <Calendar size={size} variant="Bold" color={color} />;
              break;
            case 'Add':
              icon = (
                <CircleComponent
                  size={52}
                  styles={[{marginBottom: Platform.OS === 'ios' ? 50 : 60}]}>
                  <AddSquare size={32} color={appColors.white} variant="Bold" />
                </CircleComponent>
              );
              break;
            case 'Map':
              icon = (
                <MaterialIcons name="location-pin" size={size} color={color} />
              );
              break;
            case 'Profile':
              icon = <User size={size} variant="Bold" color={color} />;
              break;
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel({focused}) {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
              styles={{marginBottom: Platform.OS === 'android' ? 12 : 0}}
            />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
