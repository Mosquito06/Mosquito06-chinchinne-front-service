import Axios from 'axios';
import { useQuery, useQueries, useMutation  } from 'react-query';

export const axiosUtil = 
{
    METHOD : 
    {
         POST : 'POST'
        ,GET : 'GET'
        ,PUT : 'PUT'
        ,DEL : 'DELETE'
    }
    ,axios : ({method, url, params, option}) =>
    {
        switch( method )
        {
            case axiosUtil.METHOD.GET : 
                
                return async () =>
                {
                    return await Axios.get(url, option);
                }
    
            case axiosUtil.METHOD.POST : 
                
                return async () =>
                {
                    return await Axios.post(url, params, option);
                }    
                
            case axiosUtil.METHOD.PUT : 
    
                return async () =>
                {
                    return await Axios.put(url, params, option);
                }
                
            case axiosUtil.METHOD.DEL : 
                
                return async () =>
                {
                    let agmt = {};
                
                    if( params )
                    {
                        agmt.data = params;
                    }
                    
                    if( option )
                    {
                        for( let attr in option )
                        {
                            agmt[attr] = option[attr];
                        }
                    }
    
                    return await Axios.delete(url, agmt);
                }
        }
    }
}

export const queryUtil =
{
    useSingleQuery : ( { keys, fn, props = { success : () => {}, error : () => {}, settle : () =>{} }, options = {} } )  =>
    {
        options.onSuccess = res => 
        {
            props.success( res );
        }

        options.onError = res =>
        {
            props.error( res );
        }

        options.onSettled =  () =>
        {
            props.settle();
        }
        
        return useQuery(keys, fn, options);
    }
    ,useMultiQuery : ( { keys, fn, props = { success : () => {}, error : () => {}, settle : () =>{} }, options = {} } )  =>
    {
        // 구현 필요
        
        // options.onSuccess = res => 
        // {
        //     if( res.data.isSuccess )
        //     {
        //         props.success( res );
        //     }
        //     else
        //     {
        //         props.error( res.data );
        //     }
        // }

        // options.onError = res =>
        // {
        //     props.error( 
        //     {
        //         message : '요청 오류 발생 - 관리자 문의'
        //     });
        // }

        // options.onSettled =  () =>
        // {
        //     props.settle();
        // }
        
        // return useQueries(keys, fn, options);
    }
    ,useCommandQuery : ( { fn, props = { success : () => {}, error : () => {}, settle : () =>{} }, options = {} } ) =>
    {
        options.onSuccess = res => 
        {
            props.success( res );
        }

        options.onError = res =>
        {
            props.error( res );
        }

        options.onSettled =  () =>
        {
            props.settle();
        }
        
        return useMutation( fn, options );
    }
}