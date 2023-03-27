import Axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import VerEx from 'verbal-expressions';
import { GlobalContext } from 'context/GlobalContext';
import { useQuery, useQueries, useMutation  } from 'react-query';
import { COMMON_ERROR_CODE, COMMON_REG_EXP_CODE } from 'module/CommonCode';

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
        const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);
        
        options.onSuccess = res => 
        {
            if( res.headers.hasOwnProperty('retoken') )
            {
                let reToken = GLOBAL_TOKEN.token;
                reToken.access_token = res.headers.retoken;

                sessionStorage.setItem('ref-token', JSON.stringify( reToken ));
                GLOBAL_TOKEN.setToken(reToken);
            }
            
            props.success( res );
        }

        options.onError = res =>
        {
            if( res.response.data.code === COMMON_ERROR_CODE.EXPIRE_TOKEN )
            {
                GLOBAL_MODAL.setModal( prevState => (
                {
                     ...prevState
                    ,isVisible : true
                    ,text : 
                    {
                        ...prevState.text
                        ,title : 'Alert'
                        ,contents : res.response.data.message
                    }
                    ,isConfirm : false
                    ,callBack : ( res ) => 
                    { 
                        GLOBAL_MODAL.setModal( prevState => ({ ...prevState, isVisible : false })); 

                        sessionStorage.setItem('ref-token', null);
                        GLOBAL_TOKEN.setToken(null);

                        window.location.href = '/'; 
                    }
                }))
            }
            else
            {
                props.error( res );
            }
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

// 콤마 포맷
export const CommaFormatter = ( value ) =>
{
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// 데이트 포맷
export const DateFormatter = (value, format) =>
{
    return moment(value).format(format);
}

// 정규 표현식 Returner
export const RegExpReturner = ( type ) =>
{
    switch( type )
    {
        case COMMON_REG_EXP_CODE.ONLY_NUM :
            
            //return VerEx().startOfLine().range('0', '9').
    }
}