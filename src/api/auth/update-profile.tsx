import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {storeToken} from '../../utils/storage';
import {LoginResponse} from '../../types/auth';
import {navigate} from '../../../navigation/RootNavigator';


type Payload = {
    firstName: string;
    email: string;
    telephone: string;
    country: string;
    region: string;
    city: string;
    licenceNumber: string
    bio: string
    qualification: string
};


export const updateProfile = (data: Partial<Payload>): Promise<LoginResponse> => axios.post('/specialists/update-me', data);

export const useUpdateProfile = () => {
    return useMutation({
        onSuccess: (data, variables) => {
            console.log(data)
            storeToken(data.token).then(() =>
                navigate('OTPVerification', variables)
            );
        },
        mutationFn: updateProfile,
    });
};
