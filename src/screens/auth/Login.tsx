import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppButton, CustomInput} from '../../../components';
import {ButtonType} from '../../../components/common/buttons/AppButton';
import {COLORS, IMAGES, SIZES} from '../../../constants';
import {KeyboadType} from '../../../components/common/inputs/CustomInput';
import {RootStackParamList} from '../../../navigation/AuthNavigation';
import {useLogin} from '../../api/auth/login';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
const Login = ({navigation}: Props) => {
  const {isLoading, mutate} = useLogin();
  const [inputs, setInputs] = useState({
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    password: '',
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

    if (!inputs.password) {
      isValid = false;
      handleErrors('This field is required', 'password');
    }

    if (isValid) {
      mutate({
        email: inputs.email,
        password: inputs.password,
      })
    } else {
      Alert.alert('Invalid');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        extraHeight={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: IMAGES.loginImage}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.login}>
          <View style={{marginBottom: 24}}>
            <Text style={styles.loginTextTitle}>Welcome!👋</Text>
            <Text style={styles.loginSubText}>
              Please enter your details to access your account
            </Text>
          </View>
          <View>
            <CustomInput
              onChangeText={text => handleInputChange(text, 'email')}
              value={inputs?.email}
              placeholder="Email address"
              email
              iconLeft
              errors={errors?.email}
              keyboard={KeyboadType.EMAIL_ADDRESS}
            />
            <View style={{marginTop: 12, marginBottom: 8}}>
              <CustomInput
                onChangeText={text => handleInputChange(text, 'password')}
                value={inputs?.password}
                errors={errors.password}
                password
                secureTextEntry
                iconLeft
                iconName="lock-outline"
                placeholder="Password"
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPass}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: 55,
            }}>
            <AppButton
              label={isLoading ? 'Loading....' : 'Login'}
              onPress={handleValidation}
              type={ButtonType.SOLID}
              textColors={COLORS.white}
            />
          </View>
          <View style={styles.noAccount}>
            <Text style={styles.noAccountText}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PersonalDetails')}
              style={{alignSelf: 'center'}}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  imageContainer: {
    paddingTop: SIZES.screenHeight * 0.04,
  },
  image: {
    width: SIZES.screenWidth,
    height: SIZES.screenHeight * 0.46,
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
  forgotPassText: {
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.primary.primary_400,
    fontSize: 12,
    marginTop: 4,
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  noAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
  },
  noAccountText: {
    color: COLORS.neutral.neutral_300,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginRight: 5,
  },
  registerText: {
    color: COLORS.primary.primary_400,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default Login;
