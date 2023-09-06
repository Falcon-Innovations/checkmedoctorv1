import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants';

type topHeaderProps = {
  step?: string;
  header?: string;
  description?: string;
};

const CommonAuthHeader: React.FC<topHeaderProps> = ({
  step,
  header,
  description,
}) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text
        style={{
          color: COLORS.neutral.neutral_400,
          fontSize: 12,
          fontFamily: 'Poppins-SemiBold',
        }}>
        {step}
      </Text>
      <View style={{marginTop: 8, marginBottom: 8}}>
        <Text style={styles.textHeader}>{header}</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  );
};

export default CommonAuthHeader;

const styles = StyleSheet.create({
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
