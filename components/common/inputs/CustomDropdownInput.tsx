import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import { COLORS } from '../../../constants';


interface Option {
  label: string;
  value: string;
}

interface Props {
  placeholder?: string;
  label?: string;
  data: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}


const CustomDropdownInput: React.FC<Props> = ({
  placeholder,
  label,
  data,
  onChange,
  selectedValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);

   const dropdownData = data.map(option => option.value);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: COLORS.primary.primary_500, borderWidth: 1,}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder || 'Select item' : '...'}
      searchPlaceholder="Search..."
      value={selectedValue}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        onChange(item.value); // Use item.value to get the selected value
        setIsFocus(false);
      }}
  
    />
  );
};

export default CustomDropdownInput;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom:12,
    backgroundColor:COLORS.neutral.neutral_50,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color:COLORS.neutral.neutral_200
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
