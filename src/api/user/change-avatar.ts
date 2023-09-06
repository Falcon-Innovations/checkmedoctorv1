import { useMutation } from 'react-query';
import { axios } from '../../lib/axios';
import { navigate } from '../../../navigation/RootNavigator';
import { Routes } from '../../routes';

type Payload = {
  phoneNumber: string;
  smsCode: string;
};

export const changeAvatar = (data: Payload): Promise<any> =>
  axios.patch('/specialists/change-avatar', data);

export const useChangeAvatar = () => {
  return useMutation({
    onSuccess: () => {
      navigate(Routes.ProfessionalDetails);
    },
    mutationFn: changeAvatar,
  });
};
