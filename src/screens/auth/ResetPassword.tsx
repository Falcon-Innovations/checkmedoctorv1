import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {AppButton, CustomInput, TopHeader} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonType} from '../../../components/common/buttons/AppButton';
import {COLORS, IMAGES, SIZES} from '../../../constants';
import {KeyboadType} from '../../../components/common/inputs/CustomInput';

const ResetPassword = () => {
  const [inputs, setInputs] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
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
   if (
     inputs.password || inputs.confirmPassword &&
     !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}/.test(
       inputs.password,
     )
   ) {
     isValid = false;
     handleErrors(
       'Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
       'password',
     );
   } 
   if (!inputs.password && !inputs.confirmPassword) {
     isValid = false;
     handleErrors('This field is required', 'password');
   }

    if (isValid) {
      Alert.alert('Valid', `Your email is ${inputs.password}`);
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
              source={{uri: IMAGES.updatePassword}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.login}>
            <View style={{marginBottom: 24}}>
              <Text style={styles.loginTextTitle}>Reset Password</Text>
              <Text style={styles.loginSubText}>
                Please enter a new password which you you can easily remember.
              </Text>
            </View>
            <View style={{marginBottom: 12}}>
              <CustomInput
                onChangeText={text => handleInputChange(text, 'password')}
                value={inputs?.password}
                errors={errors?.password}
                password
                secureTextEntry
                iconLeft
                iconName="lock-outline"
                placeholder="Password"
              />
            </View>

            <View style={{marginBottom: 12}}>
              <CustomInput
                onChangeText={text =>
                  handleInputChange(text, 'confirmPassword')
                }
                value={inputs?.confirmPassword}
                errors={errors.confirmPassword}
                password
                secureTextEntry
                iconLeft
                iconName="lock-outline"
                placeholder="Password"
              />
            </View>

            <View
              style={{
                alignSelf: 'center',
                paddingHorizontal: 55,
              }}>
              <AppButton
                label="Verify Email"
                onPress={handleValidation}
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

export default ResetPassword;

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
