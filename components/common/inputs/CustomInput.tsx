import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../../../constants';


export enum Mode {
  OUTLINED = 'outlined',
  FLAT = 'flat'
}

export enum KeyboadType {
  NUMBER_PAD = 'number-pad',
  DEFAULT = 'default',
  EMAIL_ADDRESS = 'email-address',
  NUMERIC = "numeric"
}

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  errors?: any;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconLeft?: boolean;
  iconName?: string;
  iconLibrary?: JSX.Element;
  onFocus?: () => void;
  email?: boolean;
  password?: boolean;
  mode?: Mode;
  keyboard?: KeyboadType;
  mutliline?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  email,
  password,
  placeholder,
  mode = Mode.OUTLINED,
  keyboard = KeyboadType.DEFAULT,
  mutliline,
  iconLeft,
  iconLibrary,
  errors,
  iconName = 'email-outline',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleValidation = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email address, Please enter a valid email address';
    }

    if (
      password &&
      !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}/.test(value)
    ) {
      return 'Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
    }

    return '';
  };

  const error = handleValidation();

  const renderInputStyles = () => {
    if (error) {
      return {
        borderColor: COLORS.red.red_500,
      };
    }
    if (isFocused) {
      return {
        borderColor: COLORS.primary.primary_500,
      };
    }
    return {
      borderColor: 'transparent',
    };
  };

  const inputStyles = renderInputStyles();

  return (
    <>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        mode={mode}
        label={label}
        multiline={mutliline}
        keyboardType={keyboard}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={hidePassword}
        outlineColor="transparent"
        activeOutlineColor={error && COLORS.red.red_500}
        onFocus={handleFocus}
        placeholderTextColor={COLORS.neutral.neutral_200}
        onBlur={handleBlur}
        style={[styles.inputContainer, inputStyles]}
        left={
          iconLeft && (
            <TextInput.Icon
              icon={iconName}
              color={COLORS.neutral.neutral_300}
            />
          )
        }
        right={
          secureTextEntry && (
            <TextInput.Icon
              onPress={() => setHidePassword(!hidePassword)}
              icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              color={COLORS.neutral.neutral_300}
            />
          )
        }
      />
      {isFocused && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : errors ? (
        <Text style={styles.errorText}>{errors}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    backgroundColor: COLORS.neutral.neutral_50,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: COLORS.neutral.neutral_400,
    marginBottom: 12,
  },
  errorText: {
    color: COLORS.red.red_500,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    // marginTop: 12,
  },

});

export default CustomInput;
