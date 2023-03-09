import { useContext } from 'react';
import { axiosUtil, queryUtil } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';

export default
{
    useSearchAccount : ( { queryOptions = { keys : ['', { pathString : null, queryString : null, params : null }], success : () => {}, settle : () => {}, isEnabled : true } } ) =>
    {
        const { GLOBAL_MODAL } = useContext(GlobalContext);

        return queryUtil.useSingleQuery(
        {
             keys : queryOptions.keys
            ,fn : params =>
            {
                const queryKey = params.queryKey;
                const pathString = ( queryKey.length > 0 && queryKey[1] && queryKey[1].pathString ) ? '/' + queryKey[1].pathString : '';
                const queryString = ( queryKey.length > 0 && queryKey[1] && queryKey[1].queryString ) ? queryKey[1].queryString : '';
                const axiosParams = ( queryKey.length > 0 && queryKey[1] && queryKey[1].params ) ? queryKey[1].params : null;
                
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.GET
                    ,url : '/account-service' + pathString + queryString
                    ,params : axiosParams
                    ,option : { headers: { 'Content-Type': 'application/json', 'Send-Type' : GLOBAL_LOGIN.loginInfo['90EDF7EC-7549-4237-A789-22FDBC95DE3E']} }
                })()
            }
            ,props :
            {
                 success : queryOptions.success
                ,settle : queryOptions.settle
                ,error : ( e ) =>
                {
                    GLOBAL_MODAL.setModal( prevState => (
                    {
                         ...prevState
                        ,isVisible : true
                        ,text : 
                        {
                            ...prevState.text
                            ,title : 'Alert'
                            ,contents : e.response.data.message
                        }
                        ,isConfirm : false
                        ,callBack : ( res ) => { GLOBAL_MODAL.setModal( prevState => ({ ...prevState, isVisible : false })); }
                    }))
                }
            }
            ,options :
            {
                enabled : queryOptions.isEnabled
               ,refetchOnWindowFocus: false
               ,retry: 0
               //,staleTime: Infinity
               ,cacheTime: Infinity
           }
        })
    }
} 