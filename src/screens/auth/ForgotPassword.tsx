import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useState } from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack';


import { AppButton, CustomInput, TopHeader } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ButtonType } from '../../../components/common/buttons/AppButton';
import { COLORS, IMAGES, SIZES } from '../../../constants';
import { KeyboadType } from '../../../components/common/inputs/CustomInput';
import { RootStackParamList } from '../../navigation/AuthNavigation';


type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword = ({navigation}: Props) => {
  const [inputs, setInputs] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
  });

  const handleInputChange = (value: string, input: any) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  const handleErrors = (errorMessage: string, input: any) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleValidation = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs?.email) {
      handleErrors('This field is required', 'email');
      isValid = false;
    } else if (
      inputs?.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)
    ) {
      handleErrors('Invalid email address', 'email');
      isValid = false;
    }

    if (isValid) {
      Alert.alert('Valid', `Your email is ${inputs.email}`);
    } else {
      Alert.alert('Invalid');
    }
  };

  return (
    <>
      <TopHeader screenTitle="Forgot Password" />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraHeight={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: IMAGES.forgotPasswordImage}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.login}>
            <View style={{marginBottom: 24}}>
              <Text style={styles.loginTextTitle}>Forgot Password? </Text>
              <Text style={styles.loginSubText}>
                Don’t worry we will help you regain your account. Please enter
                the email address associated with your account.
              </Text>
            </View>
            <View style={{marginBottom: 12}}>
              <CustomInput
                onChangeText={text => handleInputChange(text, 'email')}
                value={inputs?.email}
                placeholder="Email address"
                email
                iconLeft
                errors={errors?.email}
                keyboard={KeyboadType.EMAIL_ADDRESS}
              />
            </View>

            <View
              style={{
                alignSelf: 'center',
                paddingHorizontal: 55,
              }}>
              <AppButton
                label="Verify Email"
                onPress={() => navigation.navigate('ResetPassword')}
                type={ButtonType.SOLID}
                textColors={COLORS.white}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  imageContainer: {
    paddingTop: 0,
  },
  image: {
    width: SIZES.screenWidth,
    height: SIZES.screenHeight * 0.4,
    alignSelf: 'center',
  },
  login: {
    paddingHorizontal: SIZES.screenPaddingHorizontal,
    paddingVertical: 14,
  },
  loginTextTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: COLORS.neutral.neutral_400,
  },
  loginSubText: {
    color: COLORS.primaryLight.primary_light_900,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

});