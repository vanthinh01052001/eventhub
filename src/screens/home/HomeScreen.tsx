import {
  HambergerMenu,
  Notification,
  SearchNormal,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardComponent,
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles';
import {authSelector} from '../../redux/reducers/authReducer';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    imageUrl: '',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK ',
    },
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 168,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: StatusBar.currentHeight,
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
      <ScrollView
        style={[
          {
            flex: 1,
            marginTop: 16,
          },
        ]}>
        <SectionComponent
          styles={{
            paddingHorizontal: 0,
            paddingTop: 20,
            paddingBottom: 0,
          }}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <SpaceComponent height={5} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
        <SectionComponent styles={{paddingBottom: 0}}>
          <ImageBackground
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{resizeMode: 'contain', borderRadius: 12}}
            source={require('../../assets/images/invite-img.png')}>
            <TextComponent
              text="Invite your friends"
              size={18}
              font={fontFamilies.semiBold}
            />
            <TextComponent text="Get $20 for ticket" />
            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: appColors.blue1,
                    paddingHorizontal: 20,
                    marginTop: 12,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  color={appColors.white}
                  font={fontFamilies.semiBold}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 20}}>
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          <SpaceComponent height={5} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
