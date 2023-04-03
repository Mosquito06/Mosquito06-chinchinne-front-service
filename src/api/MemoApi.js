import { useContext, useState } from 'react';
import { axiosUtil, queryUtil } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_ERROR_CODE } from 'module/CommonCode';

export default
{
    useSearchMemo : ( { queryOptions = { keys : ['', { pathString : null, queryString : null, params : null }], success : () => {}, settle : () => {}, isEnabled : true } } ) =>
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
                    ,url : '/memo-service' + pathString + '/memo' + queryString
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
    ,useAddMemo : ( { queryOptions = { success : () => {}, settle : () => {} } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.POST
                    ,url : '/memo-service/' + GLOBAL_TOKEN.token.uuid + '/memo'
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
                            ,contents : e.response.data.message
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
    ,useUpdateMemo : ( { queryOptions = { pathString : null, success : () => {}, settle : () => {} } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.PUT
                    ,url : '/memo-service/' + GLOBAL_TOKEN.token.uuid + '/memo'
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
                            ,contents : e.response.data.message
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
    ,useUpdateComplete : ( { queryOptions = { pathString : null, success : () => {}, settle : () => {} } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.PUT
                    ,url : '/memo-service/' + GLOBAL_TOKEN.token.uuid + '/memo/complete'
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
                            ,contents : e.response.data.message
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
    ,useDeleteMemo : ( { queryOptions = { pathString : null, success : () => {}, settle : () => {} } } ) =>
    {
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

        return queryUtil.useCommandQuery(
        {
             fn : ( params ) => 
             {
                return axiosUtil.axios(
                { 
                     method : axiosUtil.METHOD.DEL
                    ,url : '/memo-service/' + GLOBAL_TOKEN.token.uuid + '/memo'
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
                            ,contents : e.response.data.message
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