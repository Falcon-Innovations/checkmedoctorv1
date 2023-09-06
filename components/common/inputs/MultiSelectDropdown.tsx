import {Alert, StyleSheet, Text, View} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import React from 'react';
import {COLORS} from '../../../constants';

interface Option {
  key: string;
  value: string;
}

interface Props {
  placeholder?: string;
  label?: string;
  data: Option[];
  selectedValue?: any;
  onChange?: (value: any) => void;
}

const MultiSelectDropdown: React.FC<Props> = ({
  placeholder,
  label,
  data,
  onChange,
  selectedValue,
}) => {

  return (
    <View>
      <MultipleSelectList
        setSelected={(item: any) => selectedValue(item)}
        placeholder={placeholder}
        data={data}
        save="value"
        label={label}
        boxStyles={{
          borderColor: 'transparent',
          backgroundColor: COLORS.neutral.neutral_50,
          marginBottom: 12,
          paddingVertical: 14,
          borderRadius: 8,
        }}
        inputStyles={{
          fontFamily: 'Poppins-Regular',
          color: COLORS.neutral.neutral_500,
          backgroundColor: COLORS.neutral.neutral_50,
          borderRadius: 8,
        }}
        dropdownStyles={{borderColor: COLORS.primary.primary_500}}
        fontFamily="Poppins-Regular"
      />
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({});
