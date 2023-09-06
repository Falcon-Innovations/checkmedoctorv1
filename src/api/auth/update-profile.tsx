import {useMutation} from 'react-query';
import {axios} from '../../lib/axios';
import {navigate} from '../../../navigation/RootNavigator';
import {Routes} from '../../routes';
import {Alert} from 'react-native';


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
    specialty: string
    yearsOfExp: string
};


export const updateProfile = (data: Partial<Payload>): Promise<any> => axios.patch('/specialists/update-me', data);

export const useUpdateProfile = () => useMutation({
    onSuccess: (data) => {
        console.log(data)
        Alert.alert('Profile Updated');
        navigate(Routes.ImageUpload)
    },
    mutationFn: updateProfile,
});
