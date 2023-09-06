import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {COLORS, IMAGES, SIZES} from '../../../constants';
import {AppButton} from '../../../components';
import {RootStackParamList} from '../../../navigation/AuthNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../routes';

type Props = NativeStackScreenProps<RootStackParamList, 'onBoarding'>;

const Onboarding = ({navigation}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary.primary_400}
      />
      <SafeAreaView
        style={{flex: 1, backgroundColor: COLORS.primary.primary_400}}>
        <Image
          source={{uri: IMAGES.onBoardImage}}
          style={styles.images}
          resizeMode="contain"
        />
        <View
          style={{
            paddingHorizontal: SIZES.screenPaddingHorizontal,
            paddingTop: SIZES.screenHeight * 0.08,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 32,
              color: COLORS.white,
              marginBottom: 6,
            }}>
            Partnering with Technology for Good Health
          </Text>
          <Text
            style={{
              width: '55%',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: COLORS.white,
              lineHeight: 28,
            }}>
            Empowering women, Defeating breast cancer
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            position: 'absolute',
            bottom: SIZES.screenHeight * 0.07,
            left: SIZES.screenPaddingHorizontal,
          }}>
          <AppButton
            label="Get Started"
            onPress={() => navigation.navigate(Routes.PersonalDetails)}
            width={SIZES.screenWidth * 0.4}
            bgColor={COLORS.white}
            rightIcon={
              <Icon
                name="arrow-right"
                color={COLORS.primary.primary_400}
                size={24}
              />
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  images: {
    height: SIZES.screenHeight * 0.8,
    width: '100%',
    // left: 0,
    right: -SIZES.screenWidth * 0.2,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: -SIZES.screenHeight * 0.04,
  },
});
