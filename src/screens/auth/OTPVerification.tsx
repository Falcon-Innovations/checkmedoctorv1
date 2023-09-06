import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppButton} from '../../../components';
import {COLORS, IMAGES, SIZES} from '../../../constants';
import {ButtonType} from '../../../components/common/buttons/AppButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AuthNavigation';
import {useConfirmAccount} from '../../api/auth/confirm-account';
import Loader from '../../../components/loader';
import {useSendOTP} from '../../api/auth/send-otp';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const OTPVerification = ({route}: Props) => {
  const {isLoading, mutate} = useConfirmAccount();
  const {isLoading: isSendLoading, mutate: mutateSend} = useSendOTP()

  const [otpInput, setOtpInput] = useState<string>('');

  const input = useRef<OTPTextView>(null);

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  const handleValidateOtp = () =>
    mutate({phoneNumber: route.params?.telephone, smsCode: otpInput});
  const handleResend = () =>
    mutateSend({phoneNumber: route.params?.telephone})


  return (
    <>
      {isLoading && <Loader />}
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
                {route.params?.telephone}
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
              <TouchableOpacity onPress={handleResend} disabled={isSendLoading}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 12,
                    color: COLORS.primary.primary_400,
                  }}>
                  {" "}
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <AppButton
                onPress={handleValidateOtp}
                type={ButtonType.SOLID}
                label={isLoading ? 'Loading....' : 'Verify Code'}
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
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
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
