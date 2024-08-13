import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {appColors} from '../../constants/appColors';
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {ArrowLeft2, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import {globalStyles} from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {EventModel} from '../../types/eventmodel';
import {fontFamilies} from '../../constants/fontFamilies';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/eventDetail-img.png')}
        style={{
          flex: 1,
          height: 244,
        }}
        imageStyle={{padding: 16, resizeMode: 'cover'}}>
        <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}>
          <RowComponent styles={{padding: 16, marginTop: 16}}>
            <RowComponent
              styles={{flex: 1}}
              onPress={() => navigation.goBack()}>
              <TouchableOpacity>
                <ArrowLeft2 size={24} color={appColors.white} />
              </TouchableOpacity>
              <TextComponent
                flex={1}
                text="Event Details"
                title
                color={appColors.white}
              />
            </RowComponent>
            <CardComponent
              styles={[globalStyles.noSpaceCard]}
              color="rgba(255, 255, 255, 0.30)">
              <MaterialIcons
                name="bookmark"
                size={22}
                color={appColors.white}
              />
            </CardComponent>
          </RowComponent>
        </LinearGradient>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 127}}>
          <SectionComponent>
            <View>
              <RowComponent
                justify="space-between"
                styles={[
                  globalStyles.shadow,
                  {
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    paddingHorizontal: 14,
                  },
                ]}>
                <AvatarGroup size={36} />
                <ButtonComponent
                  text="Invite"
                  type="primary"
                  styles={{
                    width: 80,
                    paddingVertical: 10,
                    paddingHorizontal: 18,
                    minHeight: 28,
                    marginBottom: 0,
                  }}
                />
              </RowComponent>
            </View>
          </SectionComponent>
          <SectionComponent>
            <TextComponent
              text={item.title}
              title
              size={35}
              font={fontFamilies.regular}
            />
          </SectionComponent>
          <SectionComponent>
            <RowComponent justify="flex-start">
              <CardComponent
                styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                color="rgba(86, 105, 255, 0.1)">
                <Calendar variant="Bold" size={30} color={appColors.primary} />
              </CardComponent>
              <SpaceComponent width={14} />
              <View>
                <TextComponent
                  text="14 December, 2021"
                  font={fontFamilies.medium}
                  size={16}
                />
                <SpaceComponent height={6} />
                <TextComponent text="Tuesday, 4:00PM - 9:00PM" size={12} />
              </View>
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <RowComponent justify="flex-start">
              <CardComponent
                styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                color="rgba(86, 105, 255, 0.1)">
                <Location variant="Bold" size={30} color={appColors.primary} />
              </CardComponent>
              <SpaceComponent width={14} />
              <View>
                <TextComponent
                  text={item.location.title}
                  font={fontFamilies.medium}
                  size={16}
                />
                <SpaceComponent height={6} />
                <TextComponent text={item.location.address} size={12} />
              </View>
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <RowComponent justify="space-between">
              <RowComponent justify="flex-start">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
                <SpaceComponent width={14} />
                <View>
                  <TextComponent
                    text="Ashfak Sayem"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <SpaceComponent height={6} />
                  <TextComponent text="Organizer" size={12} />
                </View>
              </RowComponent>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  backgroundColor: 'rgba(86, 105, 255, 0.1)',
                  borderRadius: 12,
                }}>
                <TextComponent
                  text="follow"
                  color={appColors.primary}
                  font={fontFamilies.regular}
                />
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
          <TabBarComponent title="About Event" />
          <SectionComponent>
            <TextComponent text={item.description} />
          </SectionComponent>
        </ScrollView>
      </ImageBackground>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
        }}>
        <ButtonComponent
          text="Buy Ticket $120"
          type="primary"
          onPress={() => {}}
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor: appColors.purple,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </LinearGradient>
    </View>
  );
};

export default EventDetail;
