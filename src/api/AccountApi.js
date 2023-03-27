import { useContext, useState } from 'react';
import { axiosUtil, queryUtil } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_ERROR_CODE, COMMON_ERROR_MSG } from 'module/CommonCode';

export default
{
    useSearchAccounts : ( { queryOptions = { keys : ['', { pathString : null, queryString : null, params : null }], success : () => {}, settle : () => {}, isEnabled : true } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useSingleQuery(
        {
             keys : queryOptions.keys
            ,fn : params =>
            {
                const queryKey = params.queryKey;
                const pathString = ( queryKey.length > 0 && queryKey[1] && queryKey[1].pathString ) ? '/' + queryKey[1].pathString : '';
                const queryString = ( queryKey.length > 0 && queryKey[1] && queryKey[1].queryString ) ? '?' + queryKey[1].queryString : '';
                const axiosParams = ( queryKey.length > 0 && queryKey[1] && queryKey[1].params ) ? queryKey[1].params : null;

                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.GET
                    ,url : '/account-service' + pathString + '/accounts' + queryString
                    ,params : axiosParams
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
    ,useSearchAccount : ( { queryOptions = { keys : ['', { pathString : null, queryString : null, params : null }], success : () => {}, settle : () => {}, isEnabled : true } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useSingleQuery(
        {
             keys : queryOptions.keys
            ,fn : params =>
            {
                const queryKey = params.queryKey;
                const pathString = ( queryKey.length > 0 && queryKey[1] && queryKey[1].pathString ) ? '/' + queryKey[1].pathString : '';
                const queryString = ( queryKey.length > 0 && queryKey[1] && queryKey[1].queryString ) ? '?' + queryKey[1].queryString : '';
                const axiosParams = ( queryKey.length > 0 && queryKey[1] && queryKey[1].params ) ? queryKey[1].params : null;

                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.GET
                    ,url : '/account-service' + pathString + '/account' + queryString
                    ,params : axiosParams
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
    ,useAddAccount : ( { queryOptions = { pathString : null, success : () => {}, settle : () => {} } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.POST
                    ,url : '/account-service/' + GLOBAL_TOKEN.token.uuid + '/' + GLOBAL_MODAL.detail.time + '/account'
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
                            ,contents : e.response.data.status === COMMON_ERROR_CODE.BAD_REQUEST ? COMMON_ERROR_MSG.BAD_REQUEST : e.response.data.message
                        }
                        ,isConfirm : false
                        ,callBack : ( res ) => { GLOBAL_MODAL.setModal( prevState => ({ ...prevState, isVisible : false })); }
                    }))
                }
            }
            ,options :
            {
                retry: 0
            }
        })
    }
} 