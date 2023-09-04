import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  AppButton,
  CustomInput,
  MultiSelectDropdown,
  TopHeader,
} from '../../../../components';
import {COLORS, SIZES} from '../../../../constants';
import {RootStackParamList} from '../../../../navigation/AuthNavigation';
import {ButtonType} from '../../../../components/common/buttons/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfessionalDetails'>;
const data = [
  {key: '1', value: 'General Practitioner'},
  {key: '2', value: 'Gynecologist/Obstetrician'},
  {key: '3', value: 'Onocologist'},
];

const ProfessionalDetails = ({navigation}: Props) => {
  const [inputs, setInputs] = useState({
    specialities: [],
    medicalLicenseNum: '',
    qualification: '',
    Bio: '',
    yearsOfExperience: '',
  });

  const [selected, setSelected] = useState<{key: string; value: string}[]>([]);

  const handleInputChange = (value: string | number, input: any) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  return (
    <>
      <TopHeader screenTitle="Professional Details" />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraHeight={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View>
            <Text
              style={{
                color: COLORS.neutral.neutral_400,
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
              }}>
              Step 2 of 3
            </Text>
            <View style={{marginTop: 8, marginBottom: 12}}>
              <Text style={styles.textHeader}>Professional Details</Text>
              <Text style={styles.text}>
                Please enter the requested information below.
              </Text>
            </View>
          </View>

          <MultiSelectDropdown
            label="Specialities"
            data={data}
            selectedValue={(item: any) => {
              setSelected(item);
              handleInputChange(item, 'specialities');
            }}
            placeholder="Select Specialities"
          />

          <CustomInput
            value={inputs?.medicalLicenseNum}
            onChangeText={value => {
              handleInputChange(value, 'medicalLicenseNum');
            }}
            placeholder="Medical License Number"
          />

          <CustomInput
            value={inputs?.qualification}
            onChangeText={item => {
              handleInputChange(item, 'qualification');
            }}
            placeholder="Qualification e.g Ph.D, MD"
          />
          <CustomInput
            value={inputs?.Bio}
            onChangeText={item => {
              handleInputChange(item, 'Bio');
            }}
            placeholder="Bio(max 150 words)"
            mutliline
          />
          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: 55,
            }}>
            <AppButton
              label="Continue"
              onPress={() => {
                console.log(selected);
                console.log(inputs);
                navigation.navigate('ImageUpload');
              }}
              type={ButtonType.SOLID}
              textColors={COLORS.white}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

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

export default ProfessionalDetails;
