import React, {useState} from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

export enum ButtonType {
  SOLID = 'solid',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

type ButtonProps = {
  type?: ButtonType;
  label?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  pressed?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  bgColor?: string;
  borderColor?: string;
  pressedColor?: string;
  textColors?: string;
  padding?: number;
  height?: number;
  width?: number;
};

const AppButton: React.FC<ButtonProps> = ({
  type = ButtonType.SOLID,
  label,
  leftIcon,
  rightIcon,
  onPress,
  loading,
  pressed,
  disabled,
  bgColor,
  pressedColor,
  borderColor,
  textColors,
  padding,
  width,
  height,
}) => {
  const backGroundColor = bgColor ? bgColor : COLORS.primary.primary_400;
  const borderColors = borderColor ? borderColor : COLORS.primary.primary_400;
  const textColor = textColors ? textColors : COLORS.primary.primary_400;
  const paddingHorizontal = leftIcon || rightIcon ? 10 : 2;
  const btnHeight = height ? height : 48;
  const btnWidth = width ? width : SIZES.screenWidth * 0.9;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {height: btnHeight, width: btnWidth},
          type === ButtonType.SOLID
            ? [styles.solid, {backgroundColor: backGroundColor}]
            : type === ButtonType.OUTLINED
              ? [{borderColor: borderColors}, styles.outlined]
              : [styles.text, {backgroundColor: backGroundColor}],
          loading && [{backgroundColor: backGroundColor}],
          disabled && [styles.disabled, {backgroundColor: backGroundColor}],
        ]}
        disabled={disabled}>
        {leftIcon}
        <Text
          style={[
            styles.buttonText,
            {color: textColor, paddingHorizontal: paddingHorizontal},
          ]}>
          {label}
        </Text>
        {rightIcon}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.4,
  },
});

export default AppButton;
