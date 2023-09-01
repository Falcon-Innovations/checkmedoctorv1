import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {storeToken} from '../../utils/storage';
import {LoginResponse} from '../../types/auth';
import {navigate} from '../../../navigation/RootNavigator';


type Payload = {
    phoneNumber: string;
    smsCode: string;
};


export const confirmAccount = (data: Payload): Promise<LoginResponse> => axios.post('/specialists/confirm-account', data);

export const useConfirmAccount = () => {
    return useMutation({
        onSuccess: (data) => {
            storeToken(data.token).then(() =>
                navigate('ProfessionalDetails')
            );
        },
        mutationFn: confirmAccount,
    });
};
