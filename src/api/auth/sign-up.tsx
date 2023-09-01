import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {storeToken} from '../../utils/storage';
import {LoginResponse} from '../../types/auth';
import {navigate} from '../../../navigation/RootNavigator';


type SignupPayload = {
    firstName: string;
    email: string;
    telephone: string;
    country: string;
    region: string;
    password: string;
    city: string
};


export const signUp = (data: SignupPayload): Promise<LoginResponse> => axios.post('/specialists/signup', data);

export const useSignUp = () => {
    return useMutation({
        onSuccess: (data, variables) => {
            console.log(data)
            storeToken(data.token).then(() =>
                navigate('OTPVerification', variables)
            );
        },
        mutationFn: signUp,
    });
};
