import { Alert } from 'react-native';
import { useMutation } from 'react-query';
import { axios } from '../../lib/axios';
import { navigate } from '../../../navigation/RootNavigator';
import { Routes } from '../../routes';

type Payload = {
  file: any;
};

export const changeAvatar = (data: Payload): Promise<any> => {
  const formData = new FormData();
  formData.append('image', {
    name: 'image',
    uri: data.file,
    type: 'image/jpeg',
  });

  return axios.patch('/specialists/update-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useChangeAvatar = () => {
  return useMutation({
    onSuccess: () => {
      Alert.alert('Profile Updated', 'Login to the app');
      navigate(Routes.Login);
    },
    mutationFn: changeAvatar,
  });
};
