import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {LoginResponse} from '../../types/auth';
import {navigate} from '../../../navigation/RootNavigator';
import {Routes} from '../../routes';


type Payload = {
    phoneNumber: string;
    smsCode: string;
};


export const confirmAccount = (data: Payload): Promise<LoginResponse> => axios.post('/specialists/confirm-account', data);

export const useConfirmAccount = () => {
    return useMutation({
        onSuccess: () => {
            navigate(Routes.ProfessionalDetails)
        },
        mutationFn: confirmAccount,
    });
};
