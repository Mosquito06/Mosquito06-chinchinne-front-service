import { axiosUtil, axiosMethod } from 'module/Common';

export const SignIn = ( params ) =>
{
    return axiosUtil({ method : axiosMethod.POST, url : '/login', params : params, option : {headers: { 'Content-Type': 'application/json' }} })();
}