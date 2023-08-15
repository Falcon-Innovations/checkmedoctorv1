import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';

import {
  CustomInput,
  CustomPhoneInput,
  TopHeader,
  CustomDropdownInput,
} from '../../../../components';
import {COLORS, SIZES} from '../../../../constants';
import {RootStackParamList} from '../../../navigation/AuthNavigation';
import {KeyboadType} from '../../../../components/common/inputs/CustomInput';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const PeronalDetails = () => {
  const phoneInput = useRef(null);
  // const [country, setCountry] = useState([{}]);
  const [countryData, setCountryData] = useState<
    {value: string; label: string}[]
  >([]);
  const [region, setRegion] = useState<{value: string; label: string}[]>([]);

  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const [inputs, setInputs] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    region: '',
    quarter: '',
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
          <View style={{marginTop: 8, marginBottom:8}}>
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
              placeholder='Choose Country'
              data={countryData} // Use the fetched countryData
              selectedValue={selectedCountry}
              onChange={value => {
                setSelectedCountry(value);
                handleState(value); // Fetch regions/states for the selected country
              }}
            />
            <CustomDropdownInput
              label="Select a region"
              placeholder='Choose state'
              data={region}
              selectedValue={selectedRegion} // Use a separate state for the selected region
              onChange={value => setSelectedRegion(value)}
            />
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
});
