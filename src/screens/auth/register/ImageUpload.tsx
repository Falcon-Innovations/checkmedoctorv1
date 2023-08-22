import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/AuthNavigation';
import {AppButton, TopHeader} from '../../../../components';
import {CommonAuthHeader} from '../../../../components/common/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, SIZES} from '../../../../constants';
import {ButtonType} from '../../../../components/common/buttons/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageUpload'>;

const ImageUpload = () => {
  return (
    <>
      <TopHeader screenTitle="Image Upload" />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraHeight={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <CommonAuthHeader
            step="3 of 3"
            header="Image Upload"
            description="Please upload a clear picture of yourself. This image will be used by patients to indentify you"
          />

          <View
            style={{
              paddingLeft: 10,
              alignSelf: 'center',
              height: 180,
              width: 180,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#202325',
              borderRadius: 100,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: -12,
              }}>
              <AppButton
                width={112}
                label="Upload"
                onPress={() => {
                  console.log('how far');
                }}
                type={ButtonType.SOLID}
                leftIcon={
                  <Icon name="cloud-upload-outline" size={20} color="#ffffff" />
                }
                textColors={COLORS.white}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingHorizontal: SIZES.screenPaddingHorizontal,
    paddingTop: 10,
  },
});
