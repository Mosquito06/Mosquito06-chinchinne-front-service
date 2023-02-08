import Axios from 'axios';

export const axiosMethod = 
{
     POST : 'POST'
    ,GET : 'GET'
    ,PUT : 'PUT'
    ,DEL : 'DELETE'
}

export const axiosUtil = ({method, url, params, option}) =>
{
    let promise;
    
    switch( method )
    {
        case axiosMethod.GET : 
            
            promise = async () =>
            {
                return await Axios.get(url, option);
            }

            break;

        case axiosMethod.POST : 
            
            return  async () =>
            {
                return await Axios.post(url, params, option);
            }    

            break;
        case axiosMethod.PUT : 

            promise = async () =>
            {
                return await Axios.put(url, params, option);    
            }

            break;
        case axiosMethod.DEL : 
            
            promise = async () =>
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
            break;
    }

    //return promise;
}