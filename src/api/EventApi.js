import { useContext, useState } from 'react';
import { axiosUtil, queryUtil } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_ERROR_CODE } from 'module/CommonCode';

export default
{
    useSendEvent : ( { queryOptions = { pathString : null, success : () => {}, settle : () => {} } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.POST
                    ,url : '/event-service/' + GLOBAL_TOKEN.token.uuid + '/event'
                    ,params : params
                    ,option : 
                    { 
                        headers: 
                        {
                             'Content-Type': 'application/json' 
                            ,'ChinChinne-Authorization' : JSON.stringify(
                            {
                                 'accessToken' : GLOBAL_TOKEN.token.access_token
                                ,'refreshToken' : GLOBAL_TOKEN.token.refresh_token
                            })
                        }
                    }
                })()
            }
            ,props :
            {
                 success : queryOptions.success
                ,settle : queryOptions.settle
                ,error : ( e ) => {}
            }
            ,options :
            {
                retry: 0
            }
        })
    }
} 