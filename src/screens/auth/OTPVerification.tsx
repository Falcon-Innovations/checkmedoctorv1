import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppButton, TopHeader} from '../../../components';
import {CommonAuthHeader} from '../../../components/common/header';
import {COLORS, IMAGES, SIZES} from '../../../constants';
import {ButtonType} from '../../../components/common/buttons/AppButton';

const OTPVerification: React.FC = () => {
  const [otpInput, setOtpInput] = useState<string>('');

  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(otpInput);

  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  return (
    <>
      {/* <TopHeader screenTitle='OTP Verification'/> */}
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraHeight={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Image
            source={{uri: IMAGES.otpImage}}
            style={styles.image}
            width={SIZES.screenWidth * 0.8}
            height={SIZES.screenHeight * 0.25}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
              Please enter the verification code sent to{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: COLORS.primary.primary_400,
                }}>
                email@example.com
              </Text>
            </Text>
          </View>
          <View style={{marginTop: 12}}>
            <OTPTextView
              ref={input}
              containerStyle={styles.textInputContainer}
              handleTextChange={setOtpInput}
              handleCellTextChange={handleCellTextChange}
              inputCount={4}
              keyboardType="numeric"
              defaultValue="4563"
              tintColor={COLORS.primary.primary_400}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 12,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: COLORS.neutral.neutral_400,
                  fontSize: 12,
                }}>
                Didn't receive the code?
              </Text>
              <TouchableOpacity onPress={() => console.log('Pressed')}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 12,
                    color: COLORS.primary.primary_400,
                  }}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <AppButton
                onPress={showTextAlert}
                type={ButtonType.SOLID}
                label="Verify Code"
                textColors="white"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingHorizontal: SIZES.screenPaddingHorizontal,
  },
  image: {
    alignSelf: 'center',
    marginTop: SIZES.screenHeight * 0.15,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: COLORS.neutral.neutral_400,
    marginBottom: 2,
  },
  instructions: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: COLORS.primary.primary_400,
    marginBottom: 10,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  buttonWrapper: {},
});
