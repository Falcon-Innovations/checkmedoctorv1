import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';

import ImageCropPicker from 'react-native-image-crop-picker';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/AuthNavigation';
import {AppButton, TopHeader} from '../../../../components';
import {CommonAuthHeader} from '../../../../components/common/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, IMAGES, SIZES} from '../../../../constants';
import {ButtonType} from '../../../../components/common/buttons/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageUpload'>;

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });

      setImage(image.path);
    } catch (error) {
      console.log(error);
    }
  };

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
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              height: 180,
              width: 180,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#202325',
              borderRadius: 100,
              marginTop: 12,
            }}>
            <Image
              source={{uri: IMAGES.fallBackImage}}
              resizeMode="contain"
              width={120}
              height={120}
              style={{alignSelf: 'center'}}
            />
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
                  handleImagePicker;
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
