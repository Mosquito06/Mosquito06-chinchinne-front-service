import React, { useContext } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { GlobalContext } from 'context/GlobalContext';

const PrivateRoute = ({component : RouteComponent}) => 
{
    const { GLOBAL_TOKEN } = useContext(GlobalContext);
    
    const token = GLOBAL_TOKEN.token;

    if( !token ) 
    {
        return <Navigate replace to="/login"/> ;
    }
    else
    {
        return <RouteComponent /> ;
    }
}; 

export default PrivateRoute;