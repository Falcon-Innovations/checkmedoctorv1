import React from 'react';

import {StyleSheet, Text} from 'react-native';
import PhoneNumberInput from 'react-native-phone-number-input';

import {COLORS} from '../../../constants';

interface CustomProps {
  placeholder?: string;
  value: string;
  error?: any;
  onChangeText: (text: string) => void;
  phoneInput?:any;
}

const CustomPhoneInput: React.FC<CustomProps> = ({
  value,
  onChangeText,
  placeholder,
  phoneInput
}) => {
  const handleValidation = () => {
     const isValid = phoneInput.current?.isValidNumber(value);
    if (value && value.length < 9) {
      return 'Phone number must be at least 9 characters long';
    }
    if(value && !isValid){
        return 'Please enter a valid phone number'
    }
    return '';
  };

  const renderInputStyles = () => {
    if (error) {
      return {
        borderWidth: 1,
        borderColor: COLORS.red.red_500,
      };
    }
    return {
  
    };
  };

  const error = handleValidation();

  const inputStyles = renderInputStyles();
  return (
    <>
      <PhoneNumberInput
      ref={phoneInput}
        defaultCode="CM"
        layout="second"
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        autoFocus={false}
        containerStyle={[styles.phoneinput, inputStyles]}
        textInputStyle={styles.textInputStyle}
        textContainerStyle={styles.textContainerStyle}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  );
};

export default CustomPhoneInput;

const styles = StyleSheet.create({
  phoneinput: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: COLORS.neutral.neutral_50,
    marginBottom:12,
    height: 50,

    
  },
  textInputStyle: {
    height: 48,
    backgroundColor: COLORS.neutral.neutral_50,
    paddingLeft: 12,
    fontSize: 12,
  
  },
  textContainerStyle: {
    backgroundColor: COLORS.neutral.neutral_50,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderStartWidth: 0,
  },

  errorMessage: {
    color: COLORS.red.red_500,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 12,
  },
});
