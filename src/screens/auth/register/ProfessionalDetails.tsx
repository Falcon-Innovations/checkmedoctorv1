import {View, Text, SafeAreaView, StyleSheet, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  AppButton,
  CustomDropdownInput,
  CustomInput,
  TopHeader,
} from '../../../../components';
import {COLORS, SIZES} from '../../../../constants';
import {RootStackParamList} from '../../../../navigation/AuthNavigation';
import {ButtonType} from '../../../../components/common/buttons/AppButton';
import {useUpdateProfile} from '../../../api/auth/update-profile';
import Loader from '../../../../components/loader';
import {KeyboadType} from '../../../../components/common/inputs/CustomInput';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfessionalDetails'>;

const SPECIALTIES = [
  {label: 'General Practitioner', value: 'General Practitioner'},
  {label: 'Gynecologist/Obstetrician', value: 'Gynecologist/Obstetrician'},
  {label: 'Oncologist', value: 'Oncologist'},
  {label: 'Pediatrician', value: 'Pediatrician'},
  {label: 'Breast surgeon', value: 'Breast surgeon'},

];
const QUALIFICATIONS = [{label: 'MBBS', value: 'MBBS', }, {label: 'MD', value: 'MD'}, {label: 'PhD', value: 'PhD'}, {label: 'Other', value: 'Other'}];

const ProfessionalDetails = ({navigation}: Props) => {
  const {mutate, isLoading} = useUpdateProfile();
  const [inputs, setInputs] = useState({
    medicalLicenseNum: '',
    bio: '',
    yearsOfExperience: '',
  });

  const [selectedSpecialty, setSelectedSpecialty] = useState<{label: string; value: string} | undefined>(undefined);
  const [selectedQualification, setSelectedQualification] = useState<{label: string; value: string} | undefined>(undefined);

  const handleInputChange = (value: string | number, input: any) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  const isDisabled = isLoading || !selectedSpecialty || !selectedQualification || !inputs?.yearsOfExperience || !inputs?.medicalLicenseNum

  const [errors, setErrors] = useState({
    medicalLicenseNum: '',
    bio: '',
    yearsOfExperience: '',
  });

  const handleErrors = (errorMessage: string, input: any) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleSubmit = () => {
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
        bio: inputs?.bio,
        specialty: selectedSpecialty?.value,
        licenceNumber: inputs?.medicalLicenseNum,
        qualification: selectedQualification?.value,
        yearsOfExp: inputs?.yearsOfExperience
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
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
          <CustomDropdownInput
            label="Select your specialty"
            placeholder="Choose specialty"
            data={SPECIALTIES}
            selectedValue={selectedSpecialty}
            onChange={value => {
              setSelectedSpecialty(value);
            }}
          />
          <CustomInput
            value={inputs?.yearsOfExperience}
            onChangeText={item => {
              handleInputChange(item, 'yearsOfExperience');
            }}
            placeholder="Years of experience"
            keyboard={KeyboadType.NUMERIC}
            errors={errors.yearsOfExperience}
          />
          <CustomInput
            value={inputs?.medicalLicenseNum}
            onChangeText={value => {
              handleInputChange(value, 'medicalLicenseNum');
            }}
            placeholder="Medical License Number"
            errors={errors.medicalLicenseNum}
          />

          <CustomDropdownInput
            label="Select your qualification"
            placeholder="Choose qualification"
            data={QUALIFICATIONS}
            selectedValue={selectedQualification}
            onChange={value => {
              setSelectedQualification(value);
            }}
          />

          <CustomInput
            value={inputs?.bio}
            onChangeText={item => {
              handleInputChange(item, 'bio');
            }}
            placeholder="bio (max 150 words)"
            errors={errors.bio}
            mutliline
          />
          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: 55,
            }}>
            <AppButton
              label={isLoading ? 'Loading...' : "Continue"}
              onPress={handleSubmit}
              type={ButtonType.SOLID}
              textColors={COLORS.white}
              disabled={isDisabled}
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
