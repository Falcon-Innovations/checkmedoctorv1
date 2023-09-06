import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AppButton, TopHeader} from '../../../../components';
import {CommonAuthHeader} from '../../../../components/common/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, IMAGES, SIZES} from '../../../../constants';
import {ButtonType} from '../../../../components/common/buttons/AppButton';
import {useChangeAvatar} from '../../../api/user/change-avatar';
import Loader from '../../../../components/loader';


const ImageUpload = () => {
  const {mutate, isLoading} = useChangeAvatar()
  const [image, setImage] = useState<string | null>(null);

  const handlePickImage = async () => {
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
  const handleSubmit = () => mutate({file: image})

  return (
    <>
      {isLoading && <Loader />}
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
              source={{uri: image ? image : IMAGES.fallBackImage}}
              resizeMode="cover"
              width={170}
              height={170}
              style={{alignSelf: 'center', borderRadius: 100}}
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
                onPress={handlePickImage}
                type={ButtonType.TEXT}
                bgColor="#ffffff"
                leftIcon={
                  <Icon
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.primary.primary_500}
                  />
                }
                textColors={COLORS.primary.primary_500}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: SIZES.screenHeight * 0.05,
            }}>
            <AppButton
              label={isLoading ? 'Loading....' : "Complete Registration"}
              onPress={handleSubmit}
              type={ButtonType.SOLID}
              textColors={COLORS.white}
              disabled={isLoading || !image}
            />
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
