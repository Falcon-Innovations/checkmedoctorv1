import React, {createContext, useReducer, useContext, useEffect} from 'react';
import {getToken} from '../utils/storage';

interface AuthCtxType {
    isLoading: boolean;
    signedOut: boolean;
    userToken: string | null;
    dispatch: React.Dispatch<ACTIONTYPE>;
}

const initialValues = {
    isLoading: true,
    signedOut: false,
    userToken: null
};

type ACTIONTYPE =
    | {type: 'SIGN_IN', payload: string}
    | {type: 'SIGN_OUT'}
    | {type: 'RESTORE_TOKEN', payload: string}

function authReducer(state: Omit<AuthCtxType, 'dispatch'>, action: ACTIONTYPE) {
    switch (action.type) {
        case 'SIGN_IN': {
            return {
                ...state,
                signedOut: false,
                userToken: action.payload
            }
        }
        case 'SIGN_OUT': {
            return {
                ...state,
                signedOut: true,
                userToken: null
            }
        }
        case 'RESTORE_TOKEN': {
            return {
                ...state,
                userToken: action.payload,
                isLoading: false
            }
        }
        default:
            throw new Error();
    }
}

const AuthContext = createContext<AuthCtxType>({} as AuthCtxType);

function Auth({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(authReducer, initialValues);
    useEffect(() => {
        let userToken: any;
        getToken()
            .then(token => {
                userToken = token
            })
            .catch(e => {
                // eslint-disable-next-line no-console
                console.error(e, 'error while getting user token')
            })
            .finally(() => {
                dispatch({
                    type: 'RESTORE_TOKEN',
                    payload: userToken
                })
            })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Component must be wrapped with the AuthProvider')
    }
    return context
}

export default Auth
