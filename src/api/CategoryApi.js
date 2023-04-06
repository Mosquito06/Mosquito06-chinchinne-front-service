import { useContext, useState } from 'react';
import { axiosUtil, queryUtil } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_ERROR_CODE } from 'module/CommonCode';

export default
{
    useSearchCategories : ( { queryOptions = { keys : ['', { pathString : null, queryString : null, params : null }], success : () => {}, settle : () => {}, isEnabled : true } } ) =>
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
                    ,url : '/category-service' + pathString + '/categories' + queryString
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
    ,useSearchCategoryDetail : ( { queryOptions = { keys : ['', { pathString : null, queryString : null, params : null }], success : () => {}, settle : () => {}, isEnabled : true } } ) =>
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
                    ,url : '/category-service' + pathString + queryString
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
} 