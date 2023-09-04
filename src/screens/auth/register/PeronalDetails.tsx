import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PhoneInput from "react-native-phone-number-input";

import {
  CustomInput,
  CustomPhoneInput,
  TopHeader,
  CustomDropdownInput,
  AppButton,
} from '../../../../components';
import {COLORS, SIZES} from '../../../../constants';
import {RootStackParamList} from '../../../../navigation/AuthNavigation';
import {KeyboadType} from '../../../../components/common/inputs/CustomInput';
import {ButtonType} from '../../../../components/common/buttons/AppButton';
import {useSignUp} from '../../../api/auth/sign-up';
import Loader from '../../../../components/loader';
import {useCities, useCountries, useStates} from '../../../api/countries';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalDetails'>;

type Option = {
  value: string;
  label: string;
}

const PeronalDetails = ({navigation}: Props) => {
  const phoneInput = useRef<PhoneInput>(null);
  const {data} = useCountries();
  const {isLoading, mutate} = useSignUp();
  const [selectedCountry, setSelectedCountry] = useState<any>('CM');
  const [selectedRegion, setSelectedRegion] = useState<any>(undefined);
  const [selectedCity, setSelectedCity] = useState<any>(undefined);
  const {data: stateData} = useStates(selectedCountry?.value);
  const {data: cityData} = useCities(selectedCountry?.value);
  const countries: Option[] = data?.data?.map((country) => ({
    value: country.iso2, label: country.name
  })) ?? []
  const states: Option[] = stateData?.data?.map((country) => ({
    value: country.iso2, label: country.name
  })) ?? []

  const cities: Option[] = cityData?.data?.map((city) => ({
    value: city.name, label: city.name
  })) ?? []


  const [inputs, setInputs] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    region: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    emailAddress: '',
    phoneNumber: '',
    fullName: '',
  });

  const handleErrors = (errorMessage: string, input: any) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleRegister = () => {
    console.log(errors, "From handle register")
    Keyboard.dismiss();
    let isValid = true;

    Object.keys(errors).forEach((key: string) => {
      if (!inputs[key]) {
        handleErrors('This field is required', key);
        isValid = false;
      }
    })

    if (isValid) {
      mutate({
        country: selectedCountry?.label,
        region: selectedRegion?.label,
        city: selectedCity?.label,
        email: inputs?.emailAddress,
        password: inputs?.password,
        firstName: inputs?.fullName,
        telephone: inputs?.phoneNumber,
      });
    }
  };


  const handleInputChange = (value: string | number, input: any) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  const isDisabled = !inputs?.emailAddress || !inputs?.password || !inputs?.fullName || !inputs?.phoneNumber || !selectedRegion


  return (
    <>
      {isLoading && <Loader />}
      <TopHeader screenTitle="Specialist Registration" />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraHeight={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Text
            style={{
              color: COLORS.neutral.neutral_400,
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
            }}>
            Step 1 of 3
          </Text>
          <View style={{marginTop: 8, marginBottom: 8}}>
            <Text style={styles.textHeader}>Peronal Details</Text>
            <Text style={styles.text}>
              Please enter the requested information below.
            </Text>
          </View>
          <View>
            <CustomInput
              onChangeText={text => handleInputChange(text, 'fullName')}
              value={inputs?.fullName}
              placeholder="Full Name e.g John Smith"
              errors={errors.fullName}
            />
            <CustomInput
              onChangeText={text => handleInputChange(text, 'emailAddress')}
              value={inputs?.emailAddress}
              placeholder="Email address"
              errors={errors.emailAddress}
              keyboard={KeyboadType.EMAIL_ADDRESS}
            />
            <CustomPhoneInput
              phoneInput={phoneInput}
              value={inputs?.phoneNumber}
              error={errors.phoneNumber}
              onChangeFormattedText={text => handleInputChange(text, 'phoneNumber')}
            />
            <CustomDropdownInput
              label="Select a country"
              placeholder="Choose Country"
              data={countries} // Use the fetched countryData
              selectedValue={selectedCountry}
              onChange={value => {
                setSelectedCountry(value);
              }}
            />
            <CustomDropdownInput
              label="Select a region"
              placeholder="Choose state"
              data={states}
              selectedValue={selectedRegion} // Use a separate state for the selected region
              onChange={value => {
                setSelectedRegion(value);
              }}
            />
            <CustomDropdownInput
              label="Select city"
              placeholder="Choose city"
              data={cities}
              selectedValue={selectedCity}
              onChange={value => {
                setSelectedCity(value);
              }}
            />
            <CustomInput
              onChangeText={text => handleInputChange(text, 'password')}
              value={inputs?.password}
              password
              secureTextEntry
              iconLeft
              iconName="lock-outline"
              placeholder="Password"
              errors={errors.password}
            />
            <CustomInput
              onChangeText={text => handleInputChange(text, 'confirmPassword')}
              value={inputs?.confirmPassword}
              password
              errors={inputs?.password !== inputs?.confirmPassword}
              secureTextEntry
              iconLeft
              iconName="lock-outline"
              placeholder=" ConfirmPassword"
            />
            {inputs?.password !== inputs?.confirmPassword &&
              inputs?.confirmPassword?.length > 0 && (
                <Text style={styles.errorText}>Passwords do not match</Text>
              )}

            <View
              style={{
                alignSelf: 'center',
                paddingHorizontal: 55,
              }}>
              <AppButton
                label={isLoading ? "Loading..." : "Continue"}
                disabled={isDisabled}
                onPress={handleRegister}
                type={ButtonType.SOLID}
                textColors={COLORS.white}
              />
            </View>
            <View style={styles.noAccount}>
              <Text style={styles.noAccountText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{alignSelf: 'center'}}>
                <Text style={styles.registerText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default PeronalDetails;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingHorizontal: SIZES.screenPaddingHorizontal,
    paddingTop: 10,
  },
  textHeader: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.neutral.neutral_400,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral.neutral_300,
  },
  errorText: {
    color: COLORS.red.red_500,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
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
