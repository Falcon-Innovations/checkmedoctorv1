import { StyleSheet, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import React from 'react'
import { COLORS, SIZES } from '../../../constants';
import { BackButton } from '../buttons';

type topHeaderProps = {
    screenTitle?: string;
}

const TopHeader: React.FC<topHeaderProps> = ({screenTitle}) => {
const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>{screenTitle}</Text>
    </View>
  )
}

export default TopHeader

const styles = StyleSheet.create({
    header:{
        paddingHorizontal:SIZES.screenPaddingHorizontal,
        flexDirection:"row",
        alignItems:"center",
        paddingTop:16,
        paddingBottom:12,
    },
    headerText:{
        color:COLORS.neutral.neutral_400,
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        marginLeft:20,
    }
})