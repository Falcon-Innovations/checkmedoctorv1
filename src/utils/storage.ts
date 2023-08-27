import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const storagePrefix = '@check_me_doctors';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(`${storagePrefix}token`, token);
  } catch (e: any) {
    console.log(e, 'From storaagee');
    Alert.alert('Error', e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(`${storagePrefix}token`);
    if (token !== null) {
      return token;
    }
    return null;
  } catch (e: any) {
    Alert.alert('Error', e);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem(`${storagePrefix}token`);
  } catch (e: any) {
    Alert.alert('Error', e);
  }
};
