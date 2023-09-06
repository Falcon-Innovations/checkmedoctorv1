import {useAuthContext} from '../../contexts/authContext';
import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {storeToken} from '../../utils/storage';
import {LoginResponse} from '../../types/auth';


type LoginPayload = {
    email: string;
    password: string;
};


export const login = (data: LoginPayload): Promise<LoginResponse> => axios.post('/specialists/login', data);

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    return useMutation({
        onSuccess: (data) => {
            storeToken(data.token).then(() =>
                dispatch({
                    type: 'SIGN_IN',
                    payload: data.token,
                })
            );
        },
        mutationFn: login,
    });
};
