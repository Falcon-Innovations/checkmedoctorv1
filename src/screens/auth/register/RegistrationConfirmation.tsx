import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, IMAGES, SIZES} from '../../../../constants';
import {AppButton} from '../../../../components';
import {ButtonType} from '../../../../components/common/buttons/AppButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/AuthNavigation';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'RegistrationConfirmation'
>;

const RegistrationConfirmation = ({navigation}: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            style={{alignSelf: 'center', marginBottom: 18}}
            source={{uri: IMAGES.checkImage}}
            width={45}
            height={45}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              color: COLORS.neutral.neutral_400,
              marginBottom: 8,
            }}>
            Your application is submitted and is under review
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
              color: COLORS.neutral.neutral_400,
              lineHeight: 22,
            }}>
            You will be notified with the status of your application.Please
            complete your verification by uploading a copy of your medical
            licsense
          </Text>
          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: 55,
              marginTop: 24,
            }}>
            <AppButton
              label="Visit App"
              onPress={() => console.log('Home')}
              type={ButtonType.SOLID}
              textColors={COLORS.white}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.screenPaddingHorizontal,
  },
  contentContainer: {
    justifyContent: 'center',
    marginTop: SIZES.screenHeight * 0.3,
  },
});
