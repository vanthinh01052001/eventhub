import {
  HambergerMenu,
  Notification,
  SearchNormal,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React from 'react';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {
  CategoriesList,
  CircleComponent,
  RowComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 168 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={[{paddingHorizontal: 24}]}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View
              style={[
                {flex: 1, alignItems: 'center', justifyContent: 'center'},
              ]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              <TextComponent
                text="New York, USA"
                color={appColors.white}
                font={fontFamilies.medium}
                size={13}
              />
            </View>
            <CircleComponent color={appColors.purple1} size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: appColors.blue,
                    width: 10,
                    height: 10,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: appColors.purple3,
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={24} />
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                size={20}
                variant="TwoTone"
                color={appColors.white}
              />
              <View
                style={[
                  {
                    width: 1,
                    backgroundColor: appColors.gray2,
                    marginHorizontal: 10,
                    height: 20,
                  },
                ]}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponent>
            <TagComponent
              bgColor={appColors.purple4}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              label="Filters"
              icon={
                <CircleComponent color={appColors.purple5} size={20}>
                  <Sort size={16} color={appColors.purple4} />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={24} />
        </View>
        <View style={[{marginVertical: 8}]}>
          <CategoriesList isFill />
        </View>
      </View>
      <View
        style={[
          {
            flex: 1,
          },
        ]}></View>
    </View>
  );
};

export default HomeScreen;
