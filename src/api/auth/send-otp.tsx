import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {Alert} from 'react-native';


type Payload = {
    phoneNumber: string;
};

export const sendOTP = (data: Payload): Promise<{status: string, message: string}> => axios.post('/specialists/send-otp', data);

export const useSendOTP = () => {
    return useMutation({
        onSuccess: (_, variables) => {
            Alert.alert('Success', `OTP sent to ${variables.phoneNumber}`);
        },
        mutationFn: sendOTP,
    });
};
