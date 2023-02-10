import React from 'react'; 
import { Navigate, useNavigate  } from 'react-router-dom'; 

const PublicRoute = ({component : RouteComponent, restricted}) => 
{
    if( restricted )
    {
        const token = JSON.parse(localStorage.getItem('ref-token'));

        // 로그인 된 경우, 첫 메뉴로 이동
        if( token )
        {
            return <Navigate replace to={ "/" }/> ;
        }
        
        return <RouteComponent /> ;    
        
    }
    else
    {
        return <RouteComponent /> ;
    }
}; 

export default PublicRoute;