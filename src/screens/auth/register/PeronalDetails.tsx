import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';

import {
  CustomInput,
  CustomPhoneInput,
  TopHeader,
  CustomDropdownInput,
  AppButton,
} from '../../../../components';
import {COLORS, SIZES} from '../../../../constants';
import {RootStackParamList} from '../../../navigation/AuthNavigation';
import {KeyboadType} from '../../../../components/common/inputs/CustomInput';
import { ButtonType } from '../../../../components/common/buttons/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const PeronalDetails = ({navigation}:Props) => {
  const phoneInput = useRef(null);

  const [countryData, setCountryData] = useState<
    {value: string; label: string}[]
  >([]);
  const [region, setRegion] = useState<{value: string; label: string}[]>([]);
  const [city, setCity] = useState<{value: string; label: string}[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY':
          'bG52M0FQbUpQQk9HYjdoRzBtR0ZNeXE0anAyWGFjbFZaS051WXpWdQ==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const count = Object.keys(response.data).length;
        let countryArray = [];
        console.log(count);
        for (let i = 0; i < count; i++) {
          countryArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });

    setRegion([]);
  }, [selectedCountry]);

  const handleState = (countryCode: any) => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        'X-CSCAPI-KEY':
          'bG52M0FQbUpQQk9HYjdoRzBtR0ZNeXE0anAyWGFjbFZaS051WXpWdQ==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data));
        const count = Object.keys(response.data).length;
        let reionArray = [];
        console.log(count);
        for (let i = 0; i < count; i++) {
          reionArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setRegion(reionArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCity = (countryCode: any, stateCode: any) => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        'X-CSCAPI-KEY':
          'bG52M0FQbUpQQk9HYjdoRzBtR0ZNeXE0anAyWGFjbFZaS051WXpWdQ==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data));
        const count = Object.keys(response.data).length;
        let cityArray = [];
        console.log(count);
        for (let i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setCity(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (value: string | number, input: any) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  return (
    <>
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
            />
            <CustomInput
              onChangeText={text => handleInputChange(text, 'emailAddress')}
              value={inputs?.emailAddress}
              placeholder="Email address"
              keyboard={KeyboadType.EMAIL_ADDRESS}
            />
            <CustomPhoneInput
              phoneInput={phoneInput}
              onChangeText={text => handleInputChange(text, 'phoneNumber')}
              value={inputs?.phoneNumber}
            />
            <CustomDropdownInput
              label="Select a country"
              placeholder="Choose Country"
              data={countryData} // Use the fetched countryData
              selectedValue={selectedCountry}
              onChange={value => {
                setSelectedCountry(value);
                handleInputChange(value, 'country')
                handleState(value); // Fetch regions/states for the selected country
              }}
            />
            <CustomDropdownInput
              label="Select a region"
              placeholder="Choose state"
              data={region}
              selectedValue={selectedRegion} // Use a separate state for the selected region
              onChange={value => {
                setSelectedRegion(value);
                handleInputChange(value, 'region')
                handleCity(selectedCountry, value); // Fetch regions/states for the selected country
              }}
            />
            <CustomDropdownInput
              label="Select city"
              placeholder="Choose city"
              data={city}
              selectedValue={selectedCity}
              onChange={value => {setSelectedCity(value); handleInputChange(value, 'city')}}
            />
            <CustomInput
              onChangeText={text => handleInputChange(text, 'password')}
              value={inputs?.password}
              password
              secureTextEntry
              iconLeft
              iconName="lock-outline"
              placeholder="Password"
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
              label="Continue"
              onPress={() => {console.log(inputs)}}
              type={ButtonType.SOLID}
              textColors={COLORS.white}
            />
          </View>
          <View style={styles.noAccount}>
            <Text style={styles.noAccountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("PersonalDetails")} style={{alignSelf: 'center'}}>
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
  registerText:{
    color: COLORS.primary.primary_400,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
