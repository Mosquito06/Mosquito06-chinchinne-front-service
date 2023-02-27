import { axiosUtil, queryUtil } from 'module/Common';

// export const SignIn = ( params ) =>
// {
//     return axiosUtil({ method : axiosMethod.POST, url : '/login', params : params, option : {headers: { 'Content-Type': 'application/json' }} })();
// }

export default
{
    useSignIn : ( { queryOptions = { success : () => {}, settle : () => {} } } ) =>
    {
        //const { GLOBAL_ALERT } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.POST
                    ,url : '/login'
                    ,params : params
                    ,option : { headers: { 'Content-Type': 'application/json' } }
                })()
            }
            ,props :
            {
                 success : queryOptions.success
                ,settle : queryOptions.settle
                ,error : ( e ) =>
                {
                    // GLOBAL_ALERT.setPopup(
                    // {
                    //      isAlertVisible : true
                    //     ,message : e.message
                    //     ,type : ''
                    //     ,callBack : () => { GLOBAL_ALERT.setPopup( prevState => ({...prevState, isAlertVisible : false})); }
                    // })
                }
            }
            ,options :
            {
                retry: 0
            }
        })
    }
} 