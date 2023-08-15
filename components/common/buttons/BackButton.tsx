import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import React from 'react'
import { COLORS } from '../../../constants';

type backButtonProps = {
    onPress?: () => void;
}

const BackButton: React.FC<backButtonProps> = ({onPress}) => {
  return (
   <TouchableOpacity style={styles.btnStyles} onPress={onPress}>
    <Icon name='arrow-left' size={24} color={COLORS.neutral.neutral_400} style={styles.iconStyle}/>
   </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    btnStyles:{
        padding:8,
        borderWidth:1,
        borderColor: COLORS.neutral.neutral_100,
        borderRadius:24,
        alignItems:"flex-start",
       alignSelf:"flex-start",
    },
    iconStyle:{
        alignSelf:"center",
        justifyContent:"center"
    }
})